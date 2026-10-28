#!/bin/zsh
cd -- "${0:A:h}" || exit 1
if command -v python3 >/dev/null 2>&1; then
  exec python3 server.py --open
elif command -v node >/dev/null 2>&1; then
  exec node server.mjs --open
else
  echo 'Install Python 3 or Node.js, then run this launcher again.'
  read '?Press Enter to close.'
fi
