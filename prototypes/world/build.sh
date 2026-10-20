#!/usr/bin/env bash
# Generates planet.js from the sources, in this order, then fails on a // comment that hides code and on a syntax error:
#   planet.base.js -> world_patch.py (world view, inlines world.part.js) -> speedup.py (same picture, faster build)
#   -> slice.mjs (the build pauses every 12 ms so the page keeps responding) -> fallback.py (note instead of the world
#   on a software renderer or below 30 fps).
# planet.js is generated: edit the sources above, never planet.js.
set -e
cd "$(dirname "$0")"
cp planet.base.js planet.js
python world_patch.py
python speedup.py
node slice.mjs
python fallback.py
python comment_lint.py planet.js
cp planet.js .pc.mjs; node --check .pc.mjs; rm .pc.mjs
