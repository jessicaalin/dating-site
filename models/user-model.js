const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    email: {
      type: String,
      match: [/.+@.+/, "Emails need an @ sign."]
    },
    bio: {
      type: String
    },
    dateAdded: {
      type: Date
    },
    encryptedPassword: {
      type: String,
    },
    facebookID: {
      type: String
    },
    googleID: {
      type: String
    },
    role: {
      type: String,
      enum: ["normal", "admin"],
      default: "normal"
    }
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
