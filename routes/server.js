/**
 * 1 展示有问题，大部分都是应为返回的格式或者类型有问题导致的 
 */


const util = require("util");
const fs = require("fs");
const path = require("path");
const conf = require("../config");
const getFileType = require('../utils/mime');

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

const serverRoute = async (ctx, next, filePath) => {
  const stats = await stat(filePath);
  try {
    if (stats.isDirectory()) {
      const files = await readdir(filePath);
      let dir = path.relative(conf.root, filePath);
      dir = dir ? `../${dir}` : "",
      // console.log('dir', dir);
      // 相对路径，当路径相同的情况下 返回的为空，当有相对路径的时候，需要添加"\
      await ctx.render("files", {
        title: path.basename(filePath),
        files: files,
        dir,
      });
    }else {
      ctx.status = 200;
      ctx.type = getFileType(filePath);
      ctx.body = fs.createReadStream(filePath);
    }
  }catch(err) {
    // console.error(ex);
    ctx.status = 400;
    ctx.body = 'is not find find';
  }
};

module.exports = serverRoute;
