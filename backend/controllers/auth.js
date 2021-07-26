const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJWT = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Not able to save user",
      });
    } else {
      res.json({
        name: user.name,
        email: user.email,
        id: user._id,
      });
    }
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  //checking email is registered or not
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "This email is not registered",
      });
    }
    //checking password is correct or not
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Incorrect Password",
      });
    }

    //creating token
    var token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //putting token in cokkie
    res.cookie("token", token, { expire: new Date() } + 9999);

    //send response to frontend

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.signout = (req, res) => {
  //CLEAR COOKIE
  res.clearCookie("token");
  res.json({
    message: "User signout",
  });
};

//middleware
exports.isSignedIn = expressJWT({
  //expressJwt take care of next
  secret: process.env.SECRET,
  userProperty: "auth", //put a propperty in auth in req => req.auth   auth holds _id
});

//custom middleware

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not admin",
    });
  }
  next();
};
