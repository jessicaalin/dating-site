const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/dating-site", {useMongoClient:true})
  .then(() => {
    console.log("Mongoose connected.");
  })
  .catch((err) => {
    console.log("Mongoose failed.");
    console.log(err);
  });
