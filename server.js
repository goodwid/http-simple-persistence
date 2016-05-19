const http = require('http');
const url = require('url');
const db = require('./db');


// API reference
// db.create
// db.update

// db.read
// db.delete



const server = http.createServer((req,res) => {
  const requestPath = url.parse(req.url, true).pathname;
  switch (req.method) {

  case 'GET': {
    if (/^\/books/.test(requestPath)) {
      const resources = requestPath.split(/[\\/]/).splice(2);
      db.read(resources)
        .then(data => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(data));
          res.end();
        })
        .catch(err => {
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.write(err);
          res.end();
        });
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not Found.\n\nSorry, what you were looking for is not available.');
      res.end();
    }
    break;
  }

  case 'POST': {
    if (/^\/books/.test(requestPath)) {
      let body='';
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        db.create(JSON.parse(body))
          .then(data => {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(data));
            res.end();
          })
          .catch(err => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err);
            res.end();
          });
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end();
    }
    break;
  }
  case 'PUT': {
    if (/^\/books/.test(requestPath)) {
      const resource = requestPath.split(/[\\/]/).splice(1)[1];
      let body='';
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        db.update(resource, JSON.parse(body))
          .then( data => {
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.write(data);
            res.end();
          })
          .catch(err => {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.write(err);
            res.end();
          });
      });

    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end();
    }
    break;
  }
  case 'DELETE': {
    if (/^\/books/.test(requestPath)) {
      const resource = requestPath.split(/[\\/]/).splice(1)[1];
      db.delete(resource)
        .then(data => {
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.write(data);
          res.end();
        });

    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end();
    }
    break;
  }
  default: {
    res.statusCode = 405;
    res.write('Method not supported.');
    res.end();
  }
  }
});

module.exports = server;
