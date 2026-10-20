"""Static file server for the samples with caching disabled: the recording harnesses reload planet.js after every edit
and a cached module silently showed the previous version. Usage: python serve.py [port]"""
import sys, http.server, functools
class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store'); super().end_headers()
    def log_message(self, *a): pass
port = int(sys.argv[1]) if len(sys.argv) > 1 else 8799
http.server.ThreadingHTTPServer(('127.0.0.1', port), functools.partial(H, directory='.')).serve_forever()
