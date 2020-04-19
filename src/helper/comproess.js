const { createGzip, createDeflate } = require("zlib");

const comproess = (rs, req, res) => {
  const acceptEnconding = req.headers["accept-encoding"];
  if (!acceptEnconding) {
    return rs;
  } else if (acceptEnconding.match(/\bgzip\b/)) {
    res.setHeader("Content-Encoding", "gzip");
    return rs.pipe(createGzip());
  } else if (acceptEnconding.match(/\bdeflate\b/)) {
    res.setHeader("Content-Encoding", "deflate");
    return rs.pip(createDeflate());
  }
};

module.exports = comproess;
