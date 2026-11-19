#!/usr/bin/env bash
# Build, render poster, rebuild, screenshot and crop the given slugs.
set -e
cd "$(dirname "$0")/.."
OUT=/tmp/claude-0/-home-user-forja-catalogo/cf99dd88-4931-56e9-8941-ee4e28c5c69c/scratchpad
npx tsc --noEmit -p . 
npx vite build 2>&1 | grep -E "error|Error" || true
node scripts/shoot.mjs poster "$@"
npx vite build 2>&1 | grep -E "error|Error" || true
node scripts/shoot.mjs shots "$@"
for s in "$@"; do node scripts/crops.mjs "$s" "$OUT"; done
