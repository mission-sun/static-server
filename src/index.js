#!/usr/bin/env node

const serverModuel = require('./app');
const conf = require('../src/helper/cli');
const server = new serverModuel(conf);


server.start();