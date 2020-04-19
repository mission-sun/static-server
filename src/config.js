module.exports = {
  host: "127.0.0.1",
  port: "8089",
  root: process.cwd(), // 当前目录结构
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600000,
    expires: false,
    cacheContrl: true,
    lastModified: false,
    eTag: false,
  },
};
