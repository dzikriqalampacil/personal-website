#!/usr/bin/env bash

set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TARGET_BRANCH="${1:-$(git -C "${REPO_DIR}" rev-parse --abbrev-ref HEAD)}"

if ! command -v git >/dev/null 2>&1; then
  echo "git is required but not installed." >&2
  exit 1
fi

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but not installed." >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "docker compose plugin is required but not available." >&2
  exit 1
fi

cd "${REPO_DIR}"

echo "[1/3] Fetching latest changes from origin/${TARGET_BRANCH}..."
git fetch origin "${TARGET_BRANCH}"

echo "[2/3] Pulling latest code (fast-forward only)..."
git pull --ff-only origin "${TARGET_BRANCH}"

echo "[3/3] Rebuilding and restarting containers..."
docker compose up -d --build --remove-orphans

echo "Redeploy complete."