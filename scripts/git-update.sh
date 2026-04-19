#!/usr/bin/env bash
set -euo pipefail

# Simple helper to add/commit/push current repo
# Usage: ./scripts/git-update.sh "commit message"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository. Run this script inside a git repo." >&2
  exit 1
fi

root=$(git rev-parse --show-toplevel)
cd "$root"

branch=$(git rev-parse --abbrev-ref HEAD)

msg=${1-}
if [ -z "$msg" ]; then
  read -rp "Commit message: " msg
fi

git add -A
if git diff --cached --quiet; then
  echo "No staged changes to commit." >&2
fi

if git commit -m "$msg"; then
  echo "Committed: $msg"
else
  echo "Nothing to commit or commit failed." >&2
  exit 0
fi

echo "Pushing to origin/$branch..."
git push origin "$branch"
echo "Pushed."
