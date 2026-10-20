"""World view fallback (run after slice.mjs). The world needs hardware WebGL2: on a software renderer (SwiftShader,
llvmpipe) it drew 2 frames per second. Two checks, each ends in a note instead of the world (window.__fallback = reason):
1) before anything is built: no WebGL2, or the renderer string names a software renderer;
2) after the build: the median interval of animation frames 10-40 is below MIN fps (query minfps, default 30).
   Intervals of 900 ms or more are skipped and only visible frames count: a hidden or background window is throttled to
   about one frame per second, which says nothing about the GPU.
Query gpu=any skips check 1 (to measure a software renderer on purpose). In the plugin the note becomes the Board view.
Usage: python fallback.py (edits planet.js in place; every match must be unique)."""
p = 'planet.js'; s = open(p, encoding='utf-8').read()
def R(a, b):
    global s
    assert s.count(a) == 1, (s.count(a), a[:90]); s = s.replace(a, b)

R("const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });\n"
  "renderer.setPixelRatio(+(new URLSearchParams(location.search).get('pr') || 2)); renderer.setSize(W, H); renderer.setClearColor(BG);\n"
  "document.getElementById('stage').appendChild(renderer.domElement);\n",
  "const FALLBACK = KIND !== 'world' || new URLSearchParams(location.search).get('gpu') === 'any' ? null : (() => {\n"
  "  const gl = document.createElement('canvas').getContext('webgl2'); if (!gl) return 'no WebGL2';\n"
  "  const d = gl.getExtension('WEBGL_debug_renderer_info'), r = d ? String(gl.getParameter(d.UNMASKED_RENDERER_WEBGL)) : '';\n"
  "  gl.getExtension('WEBGL_lose_context')?.loseContext();\n"
  "  return /swiftshader|llvmpipe|softpipe|software|basic render/i.test(r) ? 'software renderer: ' + r : null;\n"
  "})();\n"
  "function showFallback(reason) {\n"
  "  window.__fallback = reason; const app = document.getElementById('app'); app.classList.remove('building'); app.classList.add('fallback');\n"
  "  const n = document.createElement('div'), b = document.createElement('b'), t = document.createElement('span'), sm = document.createElement('small');\n"
  "  n.className = 'fallback-note'; b.textContent = 'World view is off'; t.textContent = 'This computer draws it too slowly, so Wingline shows the Board view instead.'; sm.textContent = 'Reason: ' + reason;\n"
  "  n.append(b, t, sm); app.appendChild(n);\n"
  "}\n"
  "const renderer = FALLBACK === 'no WebGL2' ? null : new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });\n"
  "if (renderer) { renderer.setPixelRatio(+(new URLSearchParams(location.search).get('pr') || 2)); renderer.setSize(W, H); renderer.setClearColor(BG);\n"
  "document.getElementById('stage').appendChild(renderer.domElement); }\n")
R("if (KIND === 'world') startWorld();", "if (KIND === 'world') { if (FALLBACK) showFallback(FALLBACK); else startWorld(); }")
R("const s0 = performance.now(); const loop = () => { frameW(((performance.now() - s0) / 1000) % TW.end); requestAnimationFrame(loop); };",
  "const s0 = performance.now(), MIN = +(new URLSearchParams(location.search).get('minfps') || 30), fr = []; let prev = 0;\n"
  "    const loop = now => {\n"
  "      if (fr.length < 40 && prev && document.visibilityState === 'visible' && now - prev < 900) { fr.push(now - prev); if (fr.length === 40) { const iv = fr.slice(10).sort((a, b) => a - b), fps = 1000 / iv[iv.length >> 1]; window.__fps = +fps.toFixed(1); if (fps < MIN) { showFallback(`${fps.toFixed(0)} frames per second, needs ${MIN}`); return; } } }\n"
  "      prev = now; frameW(((performance.now() - s0) / 1000) % TW.end); requestAnimationFrame(loop);\n"
  "    };")
open(p, 'w', encoding='utf-8', newline='\n').write(s); print('fallback-patched')
