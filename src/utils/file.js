/**
 * 读取文件方法
 * @param  {string} 文件本地的绝对路径
 * @return {string|binary} 
 */

 const fs = require('fs'); 
 function file(filePath) {
	 // 读取图片不能是utf-8， 默认？？
	 return fs.readFileSync(filePath);
 }
 module.exports = file;