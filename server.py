#!/usr/bin/env python3
"""
Simple HTTP server for BuildSmart Billing Pro
Browser-only application served via Python HTTP server
"""
import http.server
import socketserver
import os
import sys

PORT = 5000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        if self.path == '/':
            self.path = '/buildsmart-pro.html'
        return super().do_GET()

def main():
    print("🚀 Starting BuildSmart Billing Pro - Professional Billing Management System...")
    print("   This is a browser-only HTML application served via Python HTTP server")
    print(f"✨ BuildSmart Billing Pro will be available at: http://localhost:{PORT}/buildsmart-pro.html")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 BuildSmart Billing Pro is running at:")
            print(f"   http://localhost:{PORT}/buildsmart-pro.html")
            print(f"   Or just download buildsmart-pro.html and open it in your browser!")
            print("✨ Your BuildSmart Billing Pro application is ready to use!")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        sys.exit(0)
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()