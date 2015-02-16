
function signup(req, res) {
  var user = new AV.User();
  user.set("username", req.v.username);
  user.set("password", req.v.password);
  user.set("email", req.v.email);

  // other fields can be set just like with AV.Object
  if (!!req.v.phone)
    user.set("phone", req.v.phone);

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      console.log(user);
      res.send(user);
    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.
      console.log("Error: " + error.code + " " + error.message);
      res.send(error);
    }
  });
};

function signin(req, res) {
  var username = req.v.username;
  var password = req.v.password;
  AV.User.logIn(username, password, {
    success: function (user) {
      console.log(user);
      res.locals.isLogin = true;
      res.locals.user = user;
      res.send(user);
    },
    error: function (user, error) {
      console.log("Error: " + error.code + " " + error.message);
      res.send(error);
    }
  });
}

function query_user(req, res) {
  var query = new AV.Query(AV.User);
  query.equalTo("username", req.v.username);
  query.find({
    success: function(results) {
      console.log("Successfully retrieved " + results.length + " scores.");
      res.send(results[0])
    },
    error: function(error) {
      condole.log("Error: " + error.code + " " + error.message);
      res.send(error);
    }
  });
};

function is_login(req, res) {
  var user = AV.User.current();
  if (user) {
    res.send(user);
  } else {
    res.send("No");
  }
};

exports.signup = signup;
exports.signin = signin;
exports.queryuser = query_user;
exports.is_login = is_login;
