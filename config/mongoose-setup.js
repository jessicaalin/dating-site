const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect(process.env.DATABASE_URL, {useMongoClient:true})
  .then(() => {
    console.log("Mongoose connected.");
  })
  .catch((err) => {
    console.log("Mongoose failed.");
    console.log(err);
  });
