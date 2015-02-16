// 在 Cloud code 里初始化 Express 框架
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var avosExpressCookieSession = require('avos-express-cookie-session');

var login = require('cloud/login.js');

// App 全局配置
app.set('views','cloud/views');   // 设置模板目录
app.set('view engine', 'ejs');    // 设置 template 引擎
app.use(express.bodyParser());    // 读取请求 body 的中间件
app.use(bodyParser.json());
app.use(express.cookieParser('Your Cookie Secure'));  
//使用 avos-express-cookie-session 记录登录信息到 cookie。
app.use(avosExpressCookieSession({ cookie: { maxAge: 3600000 }}));


// 使用 Express 路由 API 服务 /hello 的 HTTP GET 请求
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});


function define(uri, handler) {
  app.get(uri, function(req, res) {
    req.v = req.query;
    handler(req, res);
  });

  app.post(uri, function(req, res) {
    req.v = req.body;
    handler(req, res);
  });
}

////// '/echo' is for test.
app.get('/echo', function(req, res) {
  res.send(req.cookies);
});

app.post('/echo', function(req, res) {
  res.send(req.body);
});
//////


define('/signin', login.signin);
define('/is_login', login.is_login);


// 最后，必须有这行代码来使 express 响应 HTTP 请求
app.listen();
