#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

DOORBELL_FILE="${DOORBELL_FILE:-${ROOT_DIR}/scripts/sounds/doorbell_sound.mp3}"
HUMAN_DOORBELL_FILE="${HUMAN_DOORBELL_FILE:-${ROOT_DIR}/scripts/sounds/human_doorbell_sound.mp3}"

DOORBELL_REPEAT="${DOORBELL_REPEAT:-3}"
HUMAN_DOORBELL_REPEAT="${HUMAN_DOORBELL_REPEAT:-1}"
PLAYBACK_ROUNDS="${PLAYBACK_ROUNDS:-2}"

play_file() {
  local file_path="$1"

  if [[ ! -f "${file_path}" ]]; then
    echo "Audio file not found: ${file_path}" >&2
    return 1
  fi

  if [[ -n "${BELL_PLAY_COMMAND:-}" ]]; then
    export BELL_SOUND_FILE="${file_path}"
    # shellcheck disable=SC2086
    eval ${BELL_PLAY_COMMAND}
    return 0
  fi

  if command -v paplay >/dev/null 2>&1 && paplay "${file_path}"; then
    return 0
  fi

  if command -v mpg123 >/dev/null 2>&1 && mpg123 -q "${file_path}"; then
    return 0
  fi

  if command -v ffplay >/dev/null 2>&1 && ffplay -nodisp -autoexit -loglevel error "${file_path}" >/dev/null 2>&1; then
    return 0
  fi

  if command -v aplay >/dev/null 2>&1 && aplay -q "${file_path}"; then
    return 0
  fi

  echo "No compatible audio player succeeded for file: ${file_path}" >&2

  return 1
}

for ((round = 1; round <= PLAYBACK_ROUNDS; round++)); do
  for ((i = 1; i <= DOORBELL_REPEAT; i++)); do
    play_file "${DOORBELL_FILE}"
    sleep 0.2
  done

  for ((i = 1; i <= HUMAN_DOORBELL_REPEAT; i++)); do
    play_file "${HUMAN_DOORBELL_FILE}"
    sleep 0.2
  done
done
