#!/usr/bin/env node

const server = require('./server');

server.listen(process.argv[2] || 8080);
