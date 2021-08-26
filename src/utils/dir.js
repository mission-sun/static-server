const url = require('url');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const walk = require('./walk');
const ejsPath = path.join(__dirname, 'html-template.ejs');
let source = fs.readFileSync(ejsPath, "utf8");

function dir(url, path) {	
	let contentList = walk(path);
	const goback = (url) => {
		let returnurl = url.split('/');
		return `/${returnurl[returnurl.length -2]}`;
	}
	const html =  ejs.render(
		source, 
		{	
			title: '静态资源服务器',
			gobackurl: goback(url),
			url: url == '/' ? url: `${url}/`,
			list: contentList
		}
	);
	return html;
}

module.exports = dir;