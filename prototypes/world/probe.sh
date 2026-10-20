#!/usr/bin/env bash
# Builds, records the world view from T0 to T1 seconds at FPS frames per second and writes world-sheet.png
# (5 columns, time in the corner) for a look by eye. Usage: bash probe.sh [T0=0.5] [T1=26.5] [FPS=1]
set -e
cd "$(dirname "$0")"
. ./env.sh
T0=${1:-0.5}; T1=${2:-26.5}; FPS=${3:-1}
bash build.sh
VIEW=world FPS=$FPS T0=$T0 T1=$T1 OUT=probe timeout 500 "$EL" rec-descent.cjs 2>&1 | grep -E "^(build|frames|ERR)" | cut -c1-700
python - "$T0" "$FPS" <<'EOF'
import sys, glob
from PIL import Image, ImageDraw
t0, fps = float(sys.argv[1]), float(sys.argv[2])
fs = sorted(glob.glob('probe/*.png')); w, h, cols = 393, 300, 5
im = Image.new('RGB', (cols * w, ((len(fs) + cols - 1) // cols) * h))
for i, f in enumerate(fs):
    x = Image.open(f).convert('RGB').resize((w, h)); ImageDraw.Draw(x).text((5, 5), '%.2f' % (t0 + i / fps), fill=(224, 169, 68)); im.paste(x, ((i % cols) * w, (i // cols) * h))
im.save('world-sheet.png')
EOF
echo sheet-ok
