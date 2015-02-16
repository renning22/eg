require("cloud/app.js");

var login = require('cloud/login.js');

AV.Cloud.define("signup", login.signup);
AV.Cloud.define("signin", login.signin);
AV.Cloud.define("is_login", login.is_login);
AV.Cloud.define("query_user", login.query_user);
