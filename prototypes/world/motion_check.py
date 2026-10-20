"""Checks camera smoothness from motion.json (written by motion.cjs) against fixed acceptance limits.
Visible speed = crossfade-weighted median screen displacement of the visible camera(s), px per 10 ms.
Limits: speed <= 2.0 everywhere; speed change <= 0.06 px/10ms per 10 ms step (no kinks); during a crossfade the two
cameras' speeds within a factor 2 of each other once both exceed 0.3 (they move together).
Prints one row per phase and PASS/FAIL per limit."""
import json
m = json.load(open('motion.json')); PH = json.load(open('motion-phases.json'))
MAXV, MAXDV, RATIO = 2.0, .06, 2.0
def vis(e):
    if e['k1'] <= 0: return [('p', 1)]
    if e['k1'] < 1: return [('p', 1 - e['k1']), ('r', e['k1'])]
    if e['k2'] <= 0: return [('r', 1)]
    if e['k2'] < 1: return [('r', 1 - e['k2']), ('s', e['k2'])]
    return [('s', 1)]
sp = [sum(w * (e[c][0] if e[c] else 0) for c, w in vis(e)) for e in m]
ok_all = True
for n, a, b in PH:
    idx = [i for i, e in enumerate(m) if a <= e['t'] < b]
    if not idx: continue
    v = max(sp[i] for i in idx); dv = max(abs(sp[i] - sp[i - 1]) for i in idx if i > 0)
    rat = None
    if n.startswith('cross'):
        pairs = [(e[c][0] if e[c] else 0 for c, _ in vis(e)) for e in (m[i] for i in idx)]
        rs = [max(x, y) / min(x, y) for x, y in ((tuple(p) + (0,))[:2] for p in pairs) if min(x, y) > .3]
        rat = round(max(rs), 2) if rs else None
    ok = v <= MAXV and dv <= MAXDV and (rat is None or rat <= RATIO); ok_all &= ok
    print(f"{n:22s} {a:6.2f}-{b:6.2f}  max speed {v:5.2f}  max change {dv:5.3f}" + (f"  speed ratio {rat}" if n.startswith('cross') else '') + ('  PASS' if ok else '  FAIL'))
print('ALL PASS' if ok_all else 'SOME FAIL')
