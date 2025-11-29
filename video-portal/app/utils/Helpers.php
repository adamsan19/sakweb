<?php
/**
 * Helper Functions
 *
 * Utility functions for the Video Portal application
 *
 * @package VideoPortal
 * @author System Administrator
 * @version 1.0.0
 */

/**
 * Sanitize and validate input data
 *
 * @param mixed $data Input data
 * @param string $type Data type (string, int, float, email, url)
 * @return mixed Sanitized data or null if invalid
 */
function sanitize_input($data, $type = 'string') {
    if ($data === null || $data === '') {
        return null;
    }

    switch ($type) {
        case 'string':
            return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
        case 'int':
            $sanitized = filter_var($data, FILTER_SANITIZE_NUMBER_INT);
            return filter_var($sanitized, FILTER_VALIDATE_INT);
        case 'float':
            $sanitized = filter_var($data, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
            return filter_var($sanitized, FILTER_VALIDATE_FLOAT);
        case 'email':
            $sanitized = filter_var($data, FILTER_SANITIZE_EMAIL);
            return filter_var($sanitized, FILTER_VALIDATE_EMAIL);
        case 'url':
            $sanitized = filter_var($data, FILTER_SANITIZE_URL);
            return filter_var($sanitized, FILTER_VALIDATE_URL);
        default:
            return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
    }
}

/**
 * Format file size in human readable format
 *
 * @param int $bytes File size in bytes
 * @param int $precision Decimal precision
 * @return string Formatted file size
 */
function format_file_size($bytes, $precision = 2) {
    if ($bytes > 0) {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }
    return '0 B';
}

/**
 * Generate a random string
 *
 * @param int $length String length
 * @param string $charset Character set to use
 * @return string Random string
 */
function generate_random_string($length = 10, $charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    $result = '';
    $charset_length = strlen($charset);
    for ($i = 0; $i < $length; $i++) {
        $result .= $charset[random_int(0, $charset_length - 1)];
    }
    return $result;
}

/**
 * Check if request is AJAX
 *
 * @return bool True if AJAX request
 */
function is_ajax_request() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) &&
           strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
}

/**
 * Get client IP address
 *
 * @return string Client IP address
 */
function get_client_ip() {
    $ip_headers = [
        'HTTP_CF_CONNECTING_IP',
        'HTTP_CLIENT_IP',
        'HTTP_X_FORWARDED_FOR',
        'HTTP_X_FORWARDED',
        'HTTP_X_CLUSTER_CLIENT_IP',
        'HTTP_FORWARDED_FOR',
        'HTTP_FORWARDED',
        'REMOTE_ADDR'
    ];

    foreach ($ip_headers as $header) {
        if (isset($_SERVER[$header])) {
            $ip = trim($_SERVER[$header]);
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }

    return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
}

/**
 * Truncate text to specified length
 *
 * @param string $text Text to truncate
 * @param int $length Maximum length
 * @param string $suffix Suffix to add if truncated
 * @return string Truncated text
 */
function truncate_text($text, $length = 100, $suffix = '...') {
    if (strlen($text) <= $length) {
        return $text;
    }

    $truncated = substr($text, 0, $length - strlen($suffix));
    $last_space = strrpos($truncated, ' ');

    if ($last_space !== false) {
        $truncated = substr($truncated, 0, $last_space);
    }

    return $truncated . $suffix;
}

/**
 * Convert array to CSV string
 *
 * @param array $data Array data
 * @param array $headers Column headers
 * @return string CSV string
 */
function array_to_csv($data, $headers = null) {
    $output = fopen('php://temp', 'r+');

    if ($headers) {
        fputcsv($output, $headers);
    }

    foreach ($data as $row) {
        fputcsv($output, $row);
    }

    rewind($output);
    $csv = stream_get_contents($output);
    fclose($output);

    return $csv;
}

/**
 * Validate date format
 *
 * @param string $date Date string
 * @param string $format Expected format
 * @return bool True if valid
 */
function validate_date($date, $format = 'Y-m-d') {
    $d = DateTime::createFromFormat($format, $date);
    return $d && $d->format($format) === $date;
}

/**
 * Get current URL
 *
 * @param bool $include_query Include query string
 * @return string Current URL
 */
function get_current_url($include_query = true) {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $uri = $_SERVER['REQUEST_URI'] ?? '/';

    $url = $protocol . '://' . $host . $uri;

    if (!$include_query && strpos($url, '?') !== false) {
        $url = substr($url, 0, strpos($url, '?'));
    }

    return $url;
}

/**
 * Redirect to URL
 *
 * @param string $url URL to redirect to
 * @param int $status_code HTTP status code
 */
function redirect($url, $status_code = 302) {
    http_response_code($status_code);
    header('Location: ' . $url);
    exit;
}

/**
 * Check if string starts with substring
 *
 * @param string $haystack String to search in
 * @param string $needle String to search for
 * @return bool True if starts with
 */
function starts_with($haystack, $needle) {
    return strpos($haystack, $needle) === 0;
}

/**
 * Check if string ends with substring
 *
 * @param string $haystack String to search in
 * @param string $needle String to search for
 * @return bool True if ends with
 */
function ends_with($haystack, $needle) {
    return substr($haystack, -strlen($needle)) === $needle;
}

/**
 * Convert camelCase to snake_case
 *
 * @param string $input CamelCase string
 * @return string snake_case string
 */
function camel_to_snake($input) {
    return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
}

/**
 * Convert snake_case to camelCase
 *
 * @param string $input snake_case string
 * @return string camelCase string
 */
function snake_to_camel($input) {
    return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $input))));
}
?>
