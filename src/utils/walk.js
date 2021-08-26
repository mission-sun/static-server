const { dir } = require('console');
/**
 * 遍历读取目录内容（子目录，文件名）
 * @param  {string} reqPath 请求资源的绝对路径
 * @return {array} 目录内容列表
 */

 const fs = require('fs');
 const mime = require('./mime');
 function walk(reqPath) {
	 let files = fs.readdirSync(reqPath);
	 const dirList = [];
	 const fileList = [];
	 for(let i = 0; i < files.length; i++) {
		let itemArr = files[i].split('.');
		if (itemArr.length > 1) {
			dirList.push(files[i]);
		} else {
			fileList.push(files[i]);
		}
	 }
	 return [...dirList, ...fileList];
 }

 module.exports = walk;