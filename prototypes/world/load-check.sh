#!/usr/bin/env bash
# Load checks of the world view (about 3 minutes). Each line prints PASS or FAIL; the script exits 1 on any FAIL.
#  1) freeze: from page start to 2 s after the world is ready, no main-thread task over 50 ms (3 loads, longtask.cjs)
#  2) same world: the WebGL canvas at 10 fixed times hashes the same for a build in one go (rec=1) and a paused build
#     (rec=1&slice=1) (canvas-eq.cjs; the CSS overlay is left out, its compositing differs by a few levels)
#  3) fallback on a software renderer: SwiftShader gives the note before anything is built (ui-check.cjs SW=1)
#  4) fallback on a low frame rate: with minfps=1000 a real (off-screen) window gives the note after the build
#  5) no fallback on this machine: the same window at the default 30 fps keeps the world and reports its frame rate
# Usage: bash load-check.sh (the sample server must be running; see README).
set -e
cd "$(dirname "$0")"
. ./env.sh
bash build.sh
fail=0
ok() { if [ "$1" = 1 ]; then echo "PASS $2"; else echo "FAIL $2"; fail=1; fi; }
RUNS=3 timeout 300 "$EL" longtask.cjs > lc-lt.txt 2>&1 || true
grep -E "^(LT|ERR)" lc-lt.txt | cut -c1-220
ok "$(python -c "import sys,json; L=[json.loads(l[3:]) for l in open(sys.argv[1], encoding='utf-8') if l.startswith('LT ')]; print(int(len(L)==3 and all(d['over50']==0 for d in L)))" lc-lt.txt)" "freeze: no task over 50 ms in 3 loads"
A=$(timeout 200 "$EL" canvas-eq.cjs 2>&1 | grep -E "^(H|ERR)" || true); B=$(QS='&slice=1' timeout 200 "$EL" canvas-eq.cjs 2>&1 | grep -E "^(H|ERR)" || true)
ok "$([ -n "$A" ] && [ "${A#ERR}" = "$A" ] && [ "$A" = "$B" ] && echo 1 || echo 0)" "same world: paused build = build in one go (10 canvas hashes)"
S=$(SW=1 OUT=lc-sw timeout 130 "$EL" ui-check.cjs 2>&1 | grep "^S after" || true); echo "$S" | cut -c1-200
ok "$(echo "$S" | grep -q '"fallback":"software renderer' && echo 1 || echo 0)" "fallback: software renderer"
S=$(VISIBLE=1 QS='&minfps=1000' OUT=lc-mf timeout 130 "$EL" ui-check.cjs 2>&1 | grep "^S after" || true); echo "$S" | cut -c1-200
ok "$(echo "$S" | grep -q '"fallback":"[0-9]* frames per second, needs 1000"' && echo 1 || echo 0)" "fallback: frame rate under the minimum"
S=$(VISIBLE=1 OUT=lc-ok timeout 130 "$EL" ui-check.cjs 2>&1 | grep "^S after" || true); echo "$S" | cut -c1-200
ok "$(echo "$S" | grep -q '"fallback":null' && echo "$S" | grep -q '"fps":[0-9]' && echo 1 || echo 0)" "no fallback at the default minimum on this machine"
rm -f lc-*.png lc-lt.txt
exit $fail
