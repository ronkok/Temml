// server.cjs
const http = require('http');
const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const { URL } = require('url');
const WebSocket = require('ws');

// -----------------------------
// CLI arguments
// -----------------------------
const filename = process.argv[2];
const port = Number(process.argv[3]) || 8000;

if (!filename) {
  console.error("Usage: node server.cjs <filename> <port>");
  process.exit(1);
}

const ext = path.extname(filename).toLowerCase();
const fullPath = path.resolve(filename);
const projectRoot = process.cwd();
const initialPath = '/' + path.relative(projectRoot, fullPath).replace(/\\/g, '/');

// -----------------------------
// MIME types
// -----------------------------
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.md': 'text/plain; charset=utf-8'
};

// -----------------------------
// Helpers
// -----------------------------
function resolveFromProjectRoot(urlPath) {
  const relativePath = decodeURIComponent(urlPath).replace(/^\/+/, '');
  const resolved = path.resolve(projectRoot, relativePath);

  if (
    resolved !== projectRoot &&
    !resolved.startsWith(projectRoot + path.sep)
  ) {
    throw new Error('Forbidden path');
  }

  return resolved;
}

// -----------------------------
// Static file server
// -----------------------------
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);

    let fileToServe;

    if (ext === '.html') {
      if (url.pathname === '/') {
        res.writeHead(302, { Location: initialPath });
        res.end();
        return;
      }

      fileToServe = resolveFromProjectRoot(url.pathname);

    } else if (ext === '.md') {
      fileToServe = fullPath;

    } else {
      throw new Error("Unsupported file type");
    }

    const data = await fsp.readFile(fileToServe);
    const type = mime[path.extname(fileToServe).toLowerCase()] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': type });
    res.end(data);

  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not found');
  }
});

// -----------------------------
// WebSocket server
// -----------------------------
const wss = new WebSocket.Server({ server });

wss.on('connection', () => {
  console.log('Client connected for auto-reload');
});

// -----------------------------
// File watcher (Windows-safe)
// -----------------------------
function sendUpdate(updatedContent) {
  const message = JSON.stringify({
    type: 'update',
    content: updatedContent
  });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function sendReload() {
  const message = JSON.stringify({ type: 'reload' });

  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

if (ext === '.md') {
  fs.watchFile(fullPath, { interval: 300 }, async () => {
    console.log(`Changed: ${fullPath}`);
    const updated = await fsp.readFile(fullPath, 'utf8');
    sendUpdate(updated);
  });

} else if (ext === '.html') {
  function watchRecursive(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, entries) => {
      if (err) return;

      for (const entry of entries) {
        const p = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          if (entry.name === '.git' || entry.name === 'node_modules') continue;
          watchRecursive(p);
        } else {
          fs.watchFile(p, { interval: 300 }, () => {
            console.log(`Changed: ${p}`);
            sendReload();
          });
        }
      }
    });
  }

  watchRecursive(projectRoot);
}

// -----------------------------
server.listen(port, () => {
  console.log(`Serving ${filename} on http://localhost:${port}`);
  if (ext === '.html') {
    console.log(`Redirecting / to ${initialPath}`);
  }
});
