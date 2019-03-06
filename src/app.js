
const http = require('http');
const conf = require('./config');
const chalk = require('chalk');
const path = require('path');
const util = require('util');
const fs = require('fs');

const route = require('./helper/router');

const server = http.createServer((req, res) => {
    const filePath = path.join(conf.root,req.url);
    route(req, res, filePath);
})

server.listen(conf.port, conf.host, ()=> {
    const add = `http://${conf.host}:${conf.port}`
    console.info(`server start at  ${ chalk.green(add)}`)
});