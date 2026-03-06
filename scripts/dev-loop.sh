#!/usr/bin/env bash
set -u

while true; do
  npm run dev
  status=$?

  # Ctrl+C / terminated: stop loop intentionally.
  if [ "$status" -eq 130 ] || [ "$status" -eq 143 ]; then
    exit 0
  fi

  echo "[dev:loop] dev server exited (code=$status), restarting in 1s..."
  sleep 1
done
