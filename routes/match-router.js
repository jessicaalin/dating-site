const express = require("express");
const UserModel  = require("../models/user-model");
const router = express.Router();


// list of matches pages (user list)

router.get("/matches", (req, res, next) => {
  UserModel
    .find()
    .limit(10)
    .exec()
    .then((userResults) => {
      res.locals.listOfUsers = userResults;
      res.render("user-views/matches");
    })
    .catch((err) => {
      next(err);
    });
});


// user match profile

router.get("/match/:userId", (req, res, next) => {
  UserModel.findById(req.params.userId)
  .then((userFromDb) => {
    res.locals.userProfile = userFromDb;
    res.render("user-views/match-profile");
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
