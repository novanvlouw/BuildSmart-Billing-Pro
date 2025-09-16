#!/usr/bin/env node
/**
 * Simple HTTP server for BuildSmart Billing Pro
 * Browser-only application served via Node.js HTTP server
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Default to buildsmart-pro.html for root requests
    let filePath = req.url === '/' ? '/buildsmart-pro.html' : req.url;
    filePath = path.join(__dirname, filePath);
    
    // Get file extension
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
            return;
        }
        
        // Read and serve the file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1>');
                return;
            }
            
            // Set headers to prevent caching during development
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log('🚀 Starting BuildSmart Billing Pro - Professional Billing Management System...');
    console.log('   This is a browser-only HTML application served via Node.js HTTP server');
    console.log(`✨ BuildSmart Billing Pro will be available at: http://localhost:${PORT}/buildsmart-pro.html`);
    console.log(`🚀 BuildSmart Billing Pro is running at:`);
    console.log(`   http://localhost:${PORT}/buildsmart-pro.html`);
    console.log(`   Or just download buildsmart-pro.html and open it in your browser!`);
    console.log('✨ Your BuildSmart Billing Pro application is ready to use!');
});

// Handle server errors
server.on('error', (err) => {
    console.error('❌ Server error:', err);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Server stopped by user');
    server.close(() => {
        process.exit(0);
    });
});