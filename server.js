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
    "title" : "Gone With The Wind",
    "author" : "Margaret Mitchell",
    "genre" : "fiction",
    "pub_year" : 1964,
    "read" : false,
    "resource" : "gone_with_the_wind_1964"
  };
}


const server = http.createServer((req,res) => {
  switch (req.method) {
  case 'GET': {
    const requestPath = url.parse(req.url, true).pathname;
    if (/^\/books/.test(requestPath)){
      const resources = requestPath.split(/[\\/]/).splice(2);
      res.writeHead(200, {'Content-Type': 'text/JSON'});
      // const data = db.read(resources)
      res.write(JSON.stringify(data()));
    } else {
      res.writeHead(200, {'Content-Type': 'text/JSON'});
    }
    res.end('\n');
    break;
  }
  case 'POST': {
    res.writeHead(201, {'Content-Type': 'text/JSON'});
    var body='';
    req.on('data', (chunk) => body += chunk);
    req.on('end', () => {
      const data = body.split('=')[1];
      res.write(data);
    });
    res.end('\n');
    break;
  }
  case 'PUT': {
    break;
  }
  case 'DELETE': {
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
