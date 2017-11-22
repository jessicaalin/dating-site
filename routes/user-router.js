const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/user-model");
const router = express.Router();
const passport = require("passport");


// 1. showing signup page
router.get("/signup", (req, res, next) => {
  if(req.user) {
    res.redirect("/");
    return;
  }
  res.render("user-views/signup-page");
});

// 2. processing signup form
router.post("/process-signup", (req, res, next) => {
  if (req.body.signupPassword === ""  ||
      // strengthen criteria later and add ||
      req.body.signupPassword.length < 1
      // strengthen criteria later
      // req.body.signupPassword.match(/[^a-z0-9]/i) === null
    ){
      res.locals.errorMessage = "Password is invalid";
      res.render("user-views/signup-page");
      return;
    }
  UserModel.findOne({email: req.body.signupEmail})
    .then((userFromDb) => {
      if (userFromDb !== null){
        res.locals.errorMessage = "Email is taken";
        res.render("user-views/signup-page");
        return;
    }
    const salt = bcrypt.genSaltSync(10);
    const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);
    const theUser = new UserModel({
      fullName: req.body.signupFullName,
      email: req.body.signupEmail,
      encryptedPassword: scrambledPassword
    });
    return theUser.save();
  })
  .then(() => {
    // 3. redirect upon success
    res.redirect("/");
  })
  .catch((err) => {
    next(err);
  });
});

// 1. show login form
router.get("/login", (req, res, next) => {
  if (req.user){
    res.redirect("/");
    return;
  }
  res.render("user-views/login-page");
});

// 2. process login form
router.post("/process-login", (req, res, next) => {
  UserModel.findOne({email: req.body.loginEmail})
  .then((userFromDb) => {
    if (userFromDb === null) {
      res.locals.errorMessage = "Email incorrect.";
      res.render("user-views/login-page");
      return;
    }
    const isPasswordGood = bcrypt.compareSync(req.body.loginPassword, userFromDb.encryptedPassword);
    if (isPasswordGood === false) {
      res.locals.errorMessage = "Password incorrect.";
      res.render("user-views/login-page");
      return;
    }

    req.login(userFromDb, (err) => {
      if (err) {
        next(err);
      }
      else {
        res.redirect("/");
      }
    }); // req.login()
  }) // then()
  .catch((err) => {
    next(err);
  });
}); // router.post

// Facebook login
router.get("/facebook/login", passport.authenticate("facebook"));

router.get("/facebook/success",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "login"
  })
);

// Google login
router.get("/google/login",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  })
);

router.get("/google/success",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

// logout
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
