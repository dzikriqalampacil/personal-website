#!/usr/bin/env bash

set -euo pipefail

play_once() {
  if [[ -n "${BELL_PLAY_COMMAND:-}" ]]; then
    # shellcheck disable=SC2086
    eval ${BELL_PLAY_COMMAND}
    return 0
  fi

  if command -v paplay >/dev/null 2>&1 && [[ -f "/usr/share/sounds/freedesktop/stereo/bell.oga" ]]; then
    paplay /usr/share/sounds/freedesktop/stereo/bell.oga
    return 0
  fi

  if command -v aplay >/dev/null 2>&1 && [[ -f "/usr/share/sounds/alsa/Front_Center.wav" ]]; then
    aplay -q /usr/share/sounds/alsa/Front_Center.wav
    return 0
  fi

  if command -v speaker-test >/dev/null 2>&1; then
    speaker-test -t sine -f 880 -l 1 >/dev/null 2>&1
    return 0
  fi

  return 1
}

for _ in 1 2 3; do
  play_once
  sleep 0.2
done
