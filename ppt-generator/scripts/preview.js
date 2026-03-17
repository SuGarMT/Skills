const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Determine the project root directory
const baseDir = path.resolve(__dirname, '..');
const PORT = 8080;

const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
    // Parse URL to strip query parameters (e.g. ?v=timestamp)
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    let pathname = reqUrl.pathname === '/' ? '/sample_presentation.html' : reqUrl.pathname;

    let filePath = path.join(baseDir, pathname);

    // Simple protection against directory traversal
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(baseDir)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${PORT}/`);

    // Automatically open browser
    const startCmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${startCmd} http://127.0.0.1:${PORT}/sample_presentation.html`);
    console.log('Preview launched. Press Ctrl+C to stop the server.');
});
