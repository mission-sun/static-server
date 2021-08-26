const http = require('http');
const chalk = require('chalk');
const path = require('path');
const { stat, statSync, readdirSync, readdir } = require('fs');
const content = require('./utils/content');
const getType = require('./utils/mime');

const staticPath = path.join(__dirname, './static');
// 解析资源类型
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  getType[ extName ]
}

const server = http.createServer((req, res) => {
	if (req.url === '/favicon.ico') return;
	// 读取的内容可能是文件件，文件内容或者not found
	// 解析请求内容的类型
	let _mime = parseMime(req.url);
	if (_mime) {
		res.setHeader("Content-Type", `${_mime};charset=utf-8`);
	} else {
		res.setHeader("Content-Type", 'text/html;charset=utf-8');
	}
	let filePath = path.join(staticPath, req.url);
	console.log('current-file', filePath);

	const _content = content(req, res, filePath);
	// res.writeHead(200, 
	// 	{ 'Content-Type': 'text/html;charset=utf-8'}
	// );
	res.end(_content);
})

server.listen('3005', () => {
	console.log('server start is', chalk.red(3005));
})

