# Shared settings for the prototype scripts (sourced, not run).
# PORT: the no-store sample server (serve.py); a caching server let Electron reuse a stale planet.js.
# EL: an Electron binary for the hidden recording window. Set ELECTRON to override; otherwise the one inside the
# Hermes desktop install is used (Hermes home: HERMES_HOME, else %LOCALAPPDATA%\hermes on Windows, else ~/.hermes).
export PORT="${PORT:-8799}"
if [ -n "$ELECTRON" ]; then EL="$ELECTRON"; else
  H="${HERMES_HOME:-}"; [ -z "$H" ] && [ -n "$LOCALAPPDATA" ] && H="$LOCALAPPDATA/hermes"; H="${H:-$HOME/.hermes}"
  D="$H/hermes-agent/apps/desktop/node_modules/electron/dist"
  EL="$D/electron.exe"; [ -x "$EL" ] || EL="$D/electron"; [ -x "$EL" ] || EL="$D/Electron.app/Contents/MacOS/Electron"
fi
[ -x "$EL" ] || { echo "ERR no Electron binary; set ELECTRON=/path/to/electron" >&2; exit 1; }
curl -s -o /dev/null "http://127.0.0.1:$PORT/planet.html" || { echo "ERR sample server not running: python serve.py $PORT" >&2; exit 1; }
