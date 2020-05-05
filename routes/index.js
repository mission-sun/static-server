const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "Hello Koa 2-3!",
  });
});

// 处理cookie中间件问题
router.get("/api/cookie", async (ctx, next) => {
  console.log('USER_DATA', USER_DATA);
  let cookies = ctx.cookies.get("uerid");



  
  console.log("cookies", cookies);
  if (!cookies) {
    ctx.cookies.set("uerid", "hello world", {
      domain: "127.0.0.1", // 写cookie所在的域名
      path: "/", // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date("2021-02-15"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false, // 是否允许重写
    });
    ctx.body = "cookie is ok";
  } else {
    ctx.body = {cookies};
  }
});

router.get('/api/getData', async (ctx, next) => {
  let currentCookie = ctx.cookies.get('uerid');
  ctx.body = {currentCookie}
})

router.get("/json", async (ctx, next) => {
  ctx.body = cookies;
});

module.exports = router;
