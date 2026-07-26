#!/usr/bin/env python3
"""Kleiner lokaler Vorschau-Server für die Website (nur zum Ansehen)."""
import os
import http.server
import socketserver

# In den Website-Ordner wechseln (absoluter Pfad -> kein getcwd nötig)
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print("Server läuft auf http://127.0.0.1:%d" % PORT)
    httpd.serve_forever()
