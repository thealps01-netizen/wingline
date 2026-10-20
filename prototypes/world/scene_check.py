"""Scene check for a recorded frame sequence: catches what the flicker and motion checks miss.
coverage = share of 24 px tiles in the picture area (HUD bands excluded) that contain a drawn line (max pixel > 60);
  a low value means an empty / bare stretch. Reports the minimum and the longest run below LOW.
pop = per-frame mean change of tile brightness (0-255) and the share of tiles that change by more than 6 levels in one
  frame; a scene switch or crossfade shows as a wide simultaneous change, smooth motion as small local ones.
ink = mean picture brightness per half second (how much is drawn).
Usage: python scene_check.py <frames_dir> <fps> <t0> [t_from t_to]"""
import sys, glob, json
import numpy as np
from PIL import Image
d, fps, t0 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
lo, hi = (float(sys.argv[4]), float(sys.argv[5])) if len(sys.argv) > 5 else (-1, 1e9)
T, LOW = 24, .35
files = sorted(glob.glob(f'{d}/*.png')); ts = t0 + np.arange(len(files)) / fps
keep = [(f, t) for f, t in zip(files, ts) if lo <= t < hi]
cov, M, ink = [], [], []
for f, _ in keep:
    a = np.asarray(Image.open(f).convert('L').resize((1180, 900)), dtype=np.float32)[100:860]
    h, w = a.shape[0] // T * T, a.shape[1] // T * T; t = a[:h, :w].reshape(h // T, T, w // T, T)
    cov.append(float((t.max(axis=(1, 3)) > 60).mean())); ink.append(float(a.mean())); M.append(t.mean(axis=(1, 3)))
M = np.stack(M); D = np.abs(M[1:] - M[:-1]); mean_d = D.mean(axis=(1, 2)); wide = (D > 6).mean(axis=(1, 2))
tt = [t for _, t in keep]; run = best = 0; start = bs = None
for c, t in zip(cov, tt):
    if c < LOW: run += 1; start = t if run == 1 else start
    else: run = 0
    if run > best: best, bs = run, start
i, j = int(np.argmax(mean_d)), int(np.argmax(wide))
print(json.dumps({'frames': len(keep), 'coverage_min': round(min(cov), 3), 'coverage_min_t': round(tt[int(np.argmin(cov))], 2), 'coverage_median': round(float(np.median(cov)), 3),
  'low_run_s': round(best / fps, 2), 'low_run_from': None if bs is None else round(bs, 2), 'pop_mean_max': round(float(mean_d[i]), 2), 'pop_mean_max_t': round(tt[i + 1], 2),
  'pop_wide_max': round(float(wide[j]), 3), 'pop_wide_max_t': round(tt[j + 1], 2), 'ink_by_half_s': {f'{k / 2:.1f}': round(float(np.mean([c for c, t in zip(ink, tt) if k / 2 <= t < k / 2 + .5])), 1) for k in range(int(tt[0] * 2), int(tt[-1] * 2) + 1)}, 'cov_by_half_s': {f'{k / 2:.1f}': round(float(np.mean([c for c, t in zip(cov, tt) if k / 2 <= t < k / 2 + .5])), 2) for k in range(int(tt[0] * 2), int(tt[-1] * 2) + 1)}}))
