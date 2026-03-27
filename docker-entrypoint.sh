#!/bin/sh
set -eu

mkdir -p /app/public/uploads /app/data
chown -R nextjs:nodejs /app/public/uploads /app/data || true

exec su-exec nextjs:nodejs "$@"

