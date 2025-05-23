const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);


  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const htmlFilePath = path.join(__dirname, 'public', 'index.html');
    fs.readFile(htmlFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading index.html:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error: Could not load HTML.');
        return;
      }
      res.end(data);
    });

  } else if (req.url === '/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    const jsonData = {
      message: 'This is JSON data from the Node.js server!',
      timestamp: new Date().toISOString(),
      items: [
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' },
        { id: 3, name: 'Item C' }
      ]
    };

    res.end(JSON.stringify(jsonData));

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access HTML at: http://localhost:${PORT}/`);
  console.log(`Access JSON at: http://localhost:${PORT}/data`);
});
