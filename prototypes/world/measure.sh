#!/usr/bin/env bash
# Full check of the world view, in this order: build; camera motion limits (motion_check.py: speed <= 2 px / 10 ms,
# no kinks); a recording of the whole timeline at FPS (default 100) into wf/; flicker per phase (flicker.py, p999 of
# the tile second difference should stay under 7); scene check on every second frame (scene_check.py at 50 fps:
# coverage must never stay under 35 %, a wide simultaneous change marks a scene jump or crossfade).
# Usage: bash measure.sh [FPS]. Takes about 6 minutes at 100 fps.
set -e
cd "$(dirname "$0")"
. ./env.sh
FPS=${1:-100}
bash build.sh
VIEW=world timeout 300 "$EL" motion.cjs 2>&1 | grep -E "^(motion|ERR)" | cut -c1-200
python motion_check.py
rm -rf wf; VIEW=world FPS=$FPS T0=0 OUT=wf timeout 1500 "$EL" rec-descent.cjs 2>&1 | grep -E "^(frames|ERR)" | cut -c1-300
python flicker.py wf "$FPS" 0 "world-${FPS}fps"
rm -rf wf50; mkdir wf50
python - "$FPS" <<'EOF'
import sys, glob, shutil
step = max(1, round(float(sys.argv[1]) / 50))
for i, f in enumerate(sorted(glob.glob('wf/d*.png'))[::step]): shutil.copy(f, 'wf50/d%05d.png' % i)
EOF
python scene_check.py wf50 50 0 | python -c "import json,sys; d=json.load(sys.stdin); [d.pop(k) for k in ['ink_by_half_s','cov_by_half_s']]; print('scene', d)"
rm -rf wf50
