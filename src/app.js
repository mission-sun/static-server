
const http = require('http');
const conf = require('./config');
const chalk = require('chalk');
const path = require('path');
const util = require('util');
const fs = require('fs');

const route = require('./helper/router');


class serverModuel {
  constructor(config) {
    // console.log('config', config);
    this.conf = Object.assign({}, conf, config);
    // console.log('this-config', this.conf);
  }
  start() {
    const server = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root,req.url);
      
      if(filePath.indexOf('favicon.ico') < 0) {
        console.log('filePath', filePath);
        route(req, res, filePath);
      }
        // res.end()  res.write() 可以多次写入 只有最后调用 res.end 即可
    })
    
    server.listen(this.conf.port, this.conf.host, ()=> {
        const add = `http://${this.conf.host}:${this.conf.port}`
        console.info(`server start at  ${ chalk.green(add)}`)
    });
  }
}

module.exports = serverModuel;


