const path = require("path");
const util = require("util");
const fs = require("fs");
const config = require("../config");
const compress = require("./comproess");
const isFresh = require("./cache");
let ejs = require("ejs");

let matchType = require("../utils/mime");

const stat = util.promisify(fs.stat);
const readdir = util.promisify(fs.readdir);
const handerbars = require("handlebars");
const tplPath = path.join(__dirname, "../template/dir.tpl");
const ejsPath = path.join(__dirname, "../template/dir.ejs");

const source = fs.readFileSync(ejsPath, "utf8");
// console.log("source", source);

const template = handerbars.compile(source.toString());
// const htmlTemplate = ejs.render(source, {
//   users: [1,2,3],
// })
// console.log('htmlTemplate', htmlTemplate);

/**
 * 读取的文件返回的是buffer数据流 渲染成模板的时候需
 */

// _dirname 表示的是
// __dirname 表示当前文件所在的目录的绝对路径
// __filename 表示当前文件的绝对路径
// process.cwd() 返回运行当前脚本的工作目录的路径
//  就是运行改脚本时候的路径

// 只有require 使用相对路径 其它都是绝对路径
module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {

      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      } 

      res.statusCode = 200;
      // 注意格式问题
      res.setHeader("Content-Type", `${matchType(filePath)}; charset=UTF-8`);

      let rs = fs.createReadStream(filePath);
      rs = compress(rs, req, res);
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      try {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html;charset=UTF-8");
        const dir = path.relative(config.root, filePath);
        const data = {
          title: path.basename(filePath),
          files,
          dir: dir ? `/${dir}` : "",
        };
        // res.end(template(data))
        res.end(
          ejs.render(source, {
            users: data,
          })
        );
        // res.end(files.join(','));
      } catch (ex) {
        console.error(ex);
        res.statusCode = 400;
        res.setHeader("Content-Type", "text/plain;charset=utf-8");
        res.end(`${filePath} is not find find`);
      }
    }
  } catch (ex) {
    console.error(ex);
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain;charset=utf-8");
    res.end(`${filePath} is not find`);
  }
};
