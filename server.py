#!/usr/bin/env python3
"""Dependency-free local server. Binds only to this computer."""
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from functools import partial
from pathlib import Path
import os
import webbrowser
import argparse

parser = argparse.ArgumentParser(description="The Devil's Plan local game server")
parser.add_argument('--port', type=int, default=int(os.environ.get('PORT', '4173')))
parser.add_argument('--open', action='store_true')
args = parser.parse_args()
root = Path(__file__).resolve().parent / 'dist'

class Handler(SimpleHTTPRequestHandler):
    extensions_map = {**SimpleHTTPRequestHandler.extensions_map, '.js': 'text/javascript', '.css': 'text/css'}
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        self.send_header('X-Content-Type-Options', 'nosniff')
        super().end_headers()

for port in range(args.port, args.port + 13):
    try:
        server = ThreadingHTTPServer(('127.0.0.1', port), partial(Handler, directory=str(root)))
        break
    except OSError:
        if port == args.port + 12:
            raise
url = f'http://127.0.0.1:{port}'
print(f"\nThe Devil's Plan · Local edition\n{url}\nPress Ctrl+C to stop.\n", flush=True)
if args.open:
    webbrowser.open(url)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nGame server stopped.')
finally:
    server.server_close()
