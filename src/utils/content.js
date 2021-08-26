const path = require('path');
const fs = require('fs');
const url = require('url')

const dir = require('./dir');
const file = require('./file');

function content (req, res, path) {
	console.log('url', req.url);
	// 判断路径是否存在
	let resContent =  '';
	let exits = fs.existsSync(path);
	if (!exits) {
		res.writeHead(404, 
			{ 'Content-Type': 'text/plain' }
		);
		resContent = 'Not Found';
		// res.end('Not Found');
		return;
	};
	
	let stat = fs.statSync(path);
	// 是否文件件
	if (stat.isDirectory()) {
		resContent = dir(req.url, path);
	} else {
		resContent = file(path);
	};
	return resContent;
}

module.exports = content;