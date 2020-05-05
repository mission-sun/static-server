const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const Moment = require("moment");
const serverRoute = require('./routes/server');
const conf = require('./config');
const path = require('path');

const index = require("./routes/index");
const users = require("./routes/users");
global.USER_DATA = {};

// error handler
onerror(app);

// app.use((ctx, next) => {
//   console.log("我是第一个");
//   next();
//   console.log('我是第三个');
// });
// app.use((ctx, next) => {
//   next();
//   console.log("我是第二个");
// });

// middlewares  格式转换，方便处理数据
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger(() => {
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss'))
}));
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 静态资源服务器,静态资源服务器需要自己设置路由
app.use( async (ctx, next) => {
  const filePath = path.join(conf.root,ctx.url);
 
  // 
  await next();
  // 静态资源服务器
  // await serverRoute(ctx, next, filePath);
})

// 模拟各种中间件

// routes
app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
  ctx.body = 'not find';
});

module.exports = app;
