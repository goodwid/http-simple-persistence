const http = require('http');
const url = require('url');
const db = require('./db.new');

const server = http.createServer((req,res) => {
  const requestPath = url.parse(req.url, true).pathname;
  const validEndPoint = /^\/books/.test(requestPath);
  const id = requestPath.split(/[\\/]/).splice(1)[1];

  if (validEndPoint)
    switch (req.method) {
    case 'GET': {
      let returnedData;
      if (id) {
        returnedData = db.readOne(id);
      } else {
        returnedData = db.readAll();
      }
      returnedData
        .then(data => {
          writeJson(data, 200);
        })
        .catch(err => {
          writeError(err, 404);
        });
      break;
    }
    case 'POST': {
      let body='';
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        db.create(JSON.parse(body))
          .then(data => {
            writeJson(data, 201);
          })
          .catch(err => {
            writeError(err, 400);
          });
      });
      break;
    }
    case 'PUT': {
      let body='';
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {
        db.update(id, JSON.parse(body))
          .then( data => {
            writeJson(data, 201);
          })
          .catch(err => {
            writeError(err, 400);
          });
      });
      break;
    }
    case 'DELETE': {
      db.delete(id)
        .then(data => {
          writeJson(data, 201);
        })
        .catch(err => {
          writeError(err, 400);
        });
      break;
    }

    default: {
      res.writeHead(405, {'Content-Type': 'text/plain'});
      res.write('Method not supported.');
      res.end();
    }
    }
  else badRequest();
  function badRequest() {
    console.log(`400 ${requestPath}`);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('Bad Request.\n\nSorry, that request is not supported');
    res.end();
  }
  function writeJson(data, code) {
    console.log(`${code} ${requestPath}`);
    res.writeHead(code, {'Content-Type': 'application/json'});
    if (typeof(data) === 'object') {
      res.write(JSON.stringify(data.map(datum => JSON.parse(datum))));
    } else {
      res.write(data);
    }
    res.end();
  }
  function writeError(err, code) {
    console.log(`${code} ${requestPath}`);
    res.writeHead(code, {'Content-Type': 'text/plain'});
    res.write(err);
    res.end();
  }


});


module.exports = server;
