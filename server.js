const http = require('http');
const url = require('url');
// const db = require('./db');
// API reference
// db.create
// db.update

// db.read
// db.delete

// for Testing
function data() {
  return {
    'title' : 'Gone With The Wind',
    'author' : 'Margaret Mitchell',
    'genre' : 'fiction',
    'pub_year' : 1964,
    'read' : false,
    'resource' : 'gone_with_the_wind_1964'
  };
}

function list() {
  return [
    {
      resource: 'gone_with_the_wind_1964'
    },
    {
      resource: 'gone_with_the_wind_1964'
    },
    {
      resource: 'gone_with_the_wind_1964'
    }
  ];
}


const server = http.createServer((req,res) => {
  const requestPath = url.parse(req.url, true).pathname;
  switch (req.method) {

  case 'GET': {
    if (/^\/books/.test(requestPath)) {
      const resources = requestPath.split(/[\\/]/).splice(2);
      res.writeHead(200, {'Content-Type': 'application/JSON'});
      if (resources.length == 0) {
        res.write(JSON.stringify(list()));
      } else {
        res.write(JSON.stringify(data()));
      }
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Sorry, what you were looking for is not available.');
    }
    res.end('\n');
    break;
  }

  case 'POST': {
    if (/^\/books/.test(requestPath)) {
      var body='';
      res.writeHead(201, {'Content-Type': 'application/JSON'});
      req.on('data', (chunk) => body += chunk);
      req.on('end', () => {

        var data = (JSON.parse(body));
        data.resource = '';
        res.end(JSON.stringify(data));
      });
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end('\n');
    }
    break;
  }
  case 'PUT': {
    if (/^\/books/.test(requestPath)) {
      null;
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end('\n');
    }
    break;
  }
  case 'DELETE': {
    if (/^\/books/.test(requestPath)) {
      null;
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad Request.\n\nSorry, that request is not supported');
      res.end('\n');
    }
    break;
  }
  default: {
    res.statusCode = 405;
    res.write('Method not supported.');
    res.end('\n');
  }
  }
});


module.exports = server;
