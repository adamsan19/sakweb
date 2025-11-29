#!/usr/bin/env python3
"""
Video Data Fetching Script

Asynchronous video data collection and processing script
Supports concurrent fetching with progress tracking

Author: System Administrator
Version: 1.0.0
"""

import asyncio
import aiohttp
import json
import os
import sys
import time
import logging
from datetime import datetime
from typing import Dict, List, Optional, Any
from urllib.parse import urljoin, urlparse
import re

class VideoDataFetcher:
    """Main video data fetching class"""

    def __init__(self, config_path: str = None):
        self.config = self.load_config(config_path)
        self.session: Optional[aiohttp.ClientSession] = None
        self.setup_logging()

    def load_config(self, config_path: str = None) -> Dict[str, Any]:
        """Load configuration from file or use defaults"""
        default_config = {
            'base_url': 'https://example.com',
            'api_endpoints': {
                'videos': '/api/videos',
                'categories': '/api/categories'
            },
            'request_timeout': 30,
            'max_concurrent_requests': 10,
            'retry_attempts': 3,
            'retry_delay': 1,
            'output_dir': os.path.join(os.path.dirname(__file__), '..', 'storage', 'output'),
            'items_per_page': 200,
            'max_pages': 1000,
            'user_agent': 'VideoPortal/1.0.0'
        }

        if config_path and os.path.exists(config_path):
            try:
                with open(config_path, 'r', encoding='utf-8') as f:
                    user_config = json.load(f)
                default_config.update(user_config)
            except Exception as e:
                print(f"Warning: Could not load config file {config_path}: {e}")

        return default_config

    def setup_logging(self):
        """Setup logging configuration"""
        log_format = '%(asctime)s - %(levelname)s - %(message)s'
        logging.basicConfig(
            level=logging.INFO,
            format=log_format,
            handlers=[
                logging.StreamHandler(sys.stdout),
                logging.FileHandler(
                    os.path.join(self.config['output_dir'], '..', 'logs', 'python_execution.log'),
                    encoding='utf-8'
                )
            ]
        )
        self.logger = logging.getLogger(__name__)

    async def __aenter__(self):
        """Async context manager entry"""
        connector = aiohttp.TCPConnector(limit=self.config['max_concurrent_requests'])
        timeout = aiohttp.ClientTimeout(total=self.config['request_timeout'])

        self.session = aiohttp.ClientSession(
            connector=connector,
            timeout=timeout,
            headers={'User-Agent': self.config['user_agent']}
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit"""
        if self.session:
            await self.session.close()

    async def fetch_with_retry(self, url: str, **kwargs) -> Optional[Dict]:
        """Fetch URL with retry logic"""
        for attempt in range(self.config['retry_attempts']):
            try:
                async with self.session.get(url, **kwargs) as response:
                    if response.status == 200:
                        return await response.json()
                    else:
                        self.logger.warning(f"HTTP {response.status} for {url}")
                        if response.status >= 500:
                            # Server error, retry
                            continue
                        else:
                            # Client error, don't retry
                            return None
            except Exception as e:
                self.logger.warning(f"Attempt {attempt + 1} failed for {url}: {e}")
                if attempt < self.config['retry_attempts'] - 1:
                    await asyncio.sleep(self.config['retry_delay'] * (attempt + 1))

        return None

    async def fetch_page_data(self, page_number: int) -> Optional[Dict]:
        """Fetch data for a specific page"""
        url = urljoin(self.config['base_url'], self.config['api_endpoints']['videos'])
        params = {
            'page': page_number,
            'limit': self.config['items_per_page']
        }

        self.logger.info(f"Fetching page {page_number}")
        data = await self.fetch_with_retry(url, params=params)

        if data and 'videos' in data:
            # Add page metadata
            data['page_number'] = page_number
            data['fetched_at'] = datetime.now().isoformat()
            return data

        return None

    async def fetch_all_pages(self) -> Dict[str, Any]:
        """Fetch all available pages concurrently"""
        self.logger.info("Starting data collection...")

        # First, try to get total pages from API
        first_page = await self.fetch_page_data(1)
        if not first_page:
            raise Exception("Could not fetch first page")

        total_pages = first_page.get('total_pages', self.config['max_pages'])
        total_pages = min(total_pages, self.config['max_pages'])

        self.logger.info(f"Total pages to fetch: {total_pages}")

        # Create tasks for all pages
        tasks = []
        for page in range(1, total_pages + 1):
            task = asyncio.create_task(self.fetch_page_data(page))
            tasks.append(task)

        # Execute tasks with progress tracking
        results = []
        completed = 0

        for coro in asyncio.as_completed(tasks):
            result = await coro
            completed += 1

            if result:
                results.append(result)
                self.logger.info(f"Completed {completed}/{total_pages} pages")
            else:
                self.logger.warning(f"Failed to fetch page {completed}")

        # Sort results by page number
        results.sort(key=lambda x: x['page_number'])

        return {
            'total_pages': len(results),
            'pages_data': results,
            'collection_timestamp': datetime.now().isoformat(),
            'total_videos': sum(len(page.get('videos', [])) for page in results)
        }

    def process_video_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """Process and normalize video data"""
        processed_data = {
            'total_pages': raw_data['total_pages'],
            'total_videos': raw_data['total_videos'],
            'last_updated': raw_data['collection_timestamp'],
            'filecode_page_map': {},
            'processed_pages': []
        }

        for page_data in raw_data['pages_data']:
            page_number = page_data['page_number']
            videos = page_data.get('videos', [])

            processed_videos = []
            for video in videos:
                # Normalize video data structure
                processed_video = self.normalize_video_data(video)
                processed_videos.append(processed_video)

                # Build filecode to page mapping
                filecode = processed_video.get('filecode') or processed_video.get('file_code')
                if filecode:
                    processed_data['filecode_page_map'][filecode] = page_number

            processed_data['processed_pages'].append({
                'page_number': page_number,
                'video_count': len(processed_videos),
                'videos': processed_videos
            })

        return processed_data

    def normalize_video_data(self, video: Dict[str, Any]) -> Dict[str, Any]:
        """Normalize individual video data"""
        # Ensure required fields exist
        normalized = {
            'title': video.get('title', 'Unknown Title'),
            'filecode': video.get('filecode') or video.get('file_code', ''),
            'duration': video.get('duration', 0),
            'thumbnail': video.get('thumbnail', ''),
            'tags': video.get('tags', []) or video.get('tag', []),
            'description': video.get('description') or video.get('deskripsi', ''),
            'views': video.get('views', 0),
            'likes': video.get('likes', 0),
            'upload_date': video.get('upload_date', ''),
            'uploader': video.get('uploader', ''),
            'category': video.get('category', ''),
            'quality': video.get('quality', ''),
            'size': video.get('size', 0)
        }

        # Ensure tags is always an array
        if isinstance(normalized['tags'], str):
            normalized['tags'] = [tag.strip() for tag in normalized['tags'].split(',') if tag.strip()]

        # Clean and validate data
        normalized['title'] = self.clean_text(normalized['title'])
        normalized['description'] = self.clean_text(normalized['description'])

        return normalized

    def clean_text(self, text: str) -> str:
        """Clean and sanitize text data"""
        if not isinstance(text, str):
            return str(text)

        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text.strip())

        # Remove null bytes and other problematic characters
        text = text.replace('\x00', '').replace('\r\n', '\n').replace('\r', '\n')

        return text

    def save_data(self, data: Dict[str, Any]):
        """Save processed data to files"""
        os.makedirs(self.config['output_dir'], exist_ok=True)

        # Save pages metadata
        metadata_file = os.path.join(self.config['output_dir'], 'pages_metadata.json')
        metadata = {
            'total_pages': data['total_pages'],
            'total_videos': data['total_videos'],
            'last_updated': data['last_updated'],
            'filecode_page_map': data['filecode_page_map']
        }

        with open(metadata_file, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2, ensure_ascii=False)

        self.logger.info(f"Saved metadata to {metadata_file}")

        # Save individual page files
        for page_data in data['processed_pages']:
            page_file = os.path.join(self.config['output_dir'], f'data_page_{page_data["page_number"]}.json')
            with open(page_file, 'w', encoding='utf-8') as f:
                json.dump(page_data['videos'], f, indent=2, ensure_ascii=False)

            self.logger.info(f"Saved page {page_data['page_number']} to {page_file}")

    async def run(self):
        """Main execution method"""
        try:
            self.logger.info("Video Data Fetcher started")

            # Fetch all data
            raw_data = await self.fetch_all_pages()

            # Process data
            processed_data = self.process_video_data(raw_data)

            # Save data
            self.save_data(processed_data)

            self.logger.info(f"Successfully processed {processed_data['total_videos']} videos across {processed_data['total_pages']} pages")

        except Exception as e:
            self.logger.error(f"Error during execution: {e}")
            raise

async def main():
    """Main entry point"""
    config_path = os.path.join(os.path.dirname(__file__), 'config.json')

    async with VideoDataFetcher(config_path) as fetcher:
        await fetcher.run()

if __name__ == '__main__':
    # Run the async main function
    asyncio.run(main())
