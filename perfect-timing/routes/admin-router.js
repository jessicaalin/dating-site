const express = require("express");

const UserModel = require("../models/user-model");

const router = express.Router();

router.get("/admin/users", (req, res, next) => {
  if ( req.user === undefined || req.user.role !== "admin") {
    next();
    return;
  }
  UserModel
    .find()
    .exec()
    .then((userResults) => {
      res.locals.listOfUsers = userResults;
      res.render("admin-views/user-list");
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
