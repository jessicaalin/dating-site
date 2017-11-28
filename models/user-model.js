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
    mon: {
      type: Boolean,
      default: false
    },
    tue: {
      type: Boolean,
      default: false
    },
    wed: {
      type: Boolean,
      default: false
    },
    thur: {
      type: Boolean,
      default: false
    },
    fri: {
      type: Boolean,
      default: false
    },
    sat: {
      type: Boolean,
      default: false
    },
    sun: {
      type: Boolean,
      default: false
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
