const { cache } = require("../config");
const refreshRes = (stats, req, res) => {
  const { maxAge, expires, cacheContrl, lastModified, eTag } = cache;
  if (expires) {
    res.setHeader(
      "Expires",
      new Date(Date.now() + maxAge * 1000).toUTCString()
    );
  }
  if (cacheContrl) {
    res.setHeader("Cache-Control", `public, max-age = ${maxAge}`);
  }
  if (lastModified) {
    res.setHeader("Last-Modified", stats.mtime.toUTCString());
  }
  if (eTag) {
    res.setHeader("Etag", `${stats.size}-${stats.mtime}`);
  }
};

function isFresh(stats, req, res) {
  // 初始化一下
  refreshRes(stats, req, res);
  console.log("请求数据", req.getHeader);

  const lastModefied = req.headers["if-modeified-since"];
  const eTag = req.headers["if-none-match"];

  if (!lastModefied && !eTag) {
    console.log("false1");
    return false;
  }
  
  console.log("false2");
  if (lastModefied && lastModefied != res.getHeader("Last-Modified")) {
    return false;
  }
  if (eTag && eTag != res.getHeader("Etag")) {
    console.log("false3");
    return false;
  }
  console.log("true");
  return true;
}
module.exports = isFresh;
