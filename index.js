#!/usr/bin/env node

const server = require('./server');
const port = process.argv[2] || 9000;

server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Now listening on http://localhost:${port}`);
});
