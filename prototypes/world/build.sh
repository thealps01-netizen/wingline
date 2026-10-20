#!/usr/bin/env bash
# Generates planet.js = planet.base.js + world_patch.py (which also inlines world.part.js) + speedup.py (load-time
# speed-ups that keep the picture the same), then fails on a // comment
# that hides code and on a syntax error. planet.js is generated: edit planet.base.js / world_patch.py / world.part.js / speedup.py.
set -e
cd "$(dirname "$0")"
cp planet.base.js planet.js
python world_patch.py
python speedup.py
python comment_lint.py planet.js
cp planet.js .pc.mjs; node --check .pc.mjs; rm .pc.mjs
