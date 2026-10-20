"""Flicker check for a recorded frame sequence.

Splits every frame into 24x24 px tiles and tracks each tile's mean brightness over time. Smooth camera motion changes
a tile's mean smoothly (lines slide in and out), so its second difference stays small; flicker (lines popping, z-fighting,
aliasing shimmer, sprites blinking) shows up as a spike. Reports per phase: the 99.9th percentile spike, the number of
tile-frames above THRESH (in 0-255 brightness levels) and the worst cases, and writes a strip image of the worst spike.
Usage: python flicker.py <frames_dir> <fps> <t0> [label]   (needs <frames_dir>/phases.json)
"""
import sys, glob, json
import numpy as np
from PIL import Image

d, fps, t0 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]); label = sys.argv[4] if len(sys.argv) > 4 else d
TILE, THRESH = 24, 4.0
# phases of the descent timeline (seconds), written by rec-descent.cjs from the page; crossfades are reported separately
PH = json.load(open(f'{d}/phases.json'))
files = sorted(glob.glob(f'{d}/d*.png'))
def tiles(f):
    a = np.asarray(Image.open(f).convert('L'), dtype=np.float32)
    h, w = a.shape[0] // TILE * TILE, a.shape[1] // TILE * TILE
    return a[:h, :w].reshape(h // TILE, TILE, w // TILE, TILE).mean(axis=(1, 3))
M = np.stack([tiles(f) for f in files])  # frames x ty x tx
D2 = np.abs(M[2:] - 2 * M[1:-1] + M[:-2])  # value at middle frame i+1
ts = t0 + (np.arange(1, len(files) - 1)) / fps
out = {'label': label, 'frames': len(files), 'phases': []}
for name, a, b in PH:
    sel = (ts >= a) & (ts < b)
    if not sel.any(): continue
    x = D2[sel]
    out['phases'].append({'phase': name, 'frames': int(sel.sum()), 'p999': round(float(np.percentile(x, 99.9)), 2), 'max': round(float(x.max()), 2), 'tiles_over': int((x > THRESH).sum())})
i, y, x = np.unravel_index(np.argmax(D2), D2.shape)
out['worst'] = {'t': round(float(ts[i]), 2), 'tile_xy': [int(x * TILE), int(y * TILE)], 'value': round(float(D2[i, y, x]), 2)}
# strip: the worst tile region (zoomed) in the frames before, at and after the spike
cx, cy = int(x * TILE + TILE / 2), int(y * TILE + TILE / 2); box = (max(0, cx - 90), max(0, cy - 70), max(0, cx - 90) + 180, max(0, cy - 70) + 140)
strip = Image.new('RGB', (180 * 3 * 2, 140 * 2))
for k, fi in enumerate([i, i + 1, i + 2]): strip.paste(Image.open(files[fi]).convert('RGB').crop(box).resize((360, 280), Image.NEAREST), (k * 360, 0))
strip.save(f'{d}-worst.png')
print(json.dumps(out))
