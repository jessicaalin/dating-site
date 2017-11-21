const passport = require("passport");
const FbStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const UserModel = require("../models/user-model");

// save to session
passport.serializeUser((userFromDb, callback) => {
  callback(null, userFromDb._id);
});

// pull from session
passport.deserializeUser((idFromSession, callback) => {
  UserModel.findById(idFromSession)
  .then((userFromDb) => {
    callback(null, userFromDb);
  })
  .catch((err) => {
    callback(err);
  });
});

// set up Fb login
passport.use(
  new FbStrategy(
    {
      clientID: "180932532486678",
      clientSecret: "d3cfdc92a07e20c7d8218cb18b90b981",
      callbackURL: "/facebook/success"
    },
    // 2nd argument of FbStrategy
    (accessToken, refreshToken, profile, callback) => {
      console.log("Facebook");
      console.log(profile);
      // check for user in database
      UserModel.findOne({ facebookID: profile.id })
      .then((userFromDb) => {
        if (userFromDb) {
          callback(null, userFromDb);
          return;
        }
        // create user if none
        const theUser = new UserModel({
          facebookID: profile.id,
          fullName: profile.displayName
        });
        return theUser.save();
      })
      .then((newUser) => {
        callback(null, newUser);
      })
      .catch((err) => {
        callback(err);
      });
    }
  ) // new FbStrategy
); // passport.use()

// set up Google login
passport.use(
  new GoogleStrategy(
    {
      clientID: "43026424358-2kf5jnegvljsslbtt8nj61eqj3263ab3.apps.googleusercontent.com",
      clientSecret: "uv1032uZwny5RZpWkKzHxzli",
      callbackURL: "/google/success",
      // error fix
      proxy: true
    },
    // 2nd argument of GoogleStrategy()
    (accessToken, refreshToken, profile, callback) => {
      console.log("Google");
      console.log(profile);
      // check for user in database
      UserModel.findOne({ googleID: profile.id })
        .then((userFromDb) => {
          if (userFromDb) {
            callback(null, userFromDb);
            return;
          }
          // create user if find none
          const theUser = new UserModel ({
            googleID: profile.id,
            fullName: profile.emails[0].value
          });
          return theUser.save();
        })
        .then((newUser) => {
          callback(null, newUser);
        })
        .catch((err) => {
          callback(err);
        });
    }
  ) // new GoogleStrategy
); // passport.use()
