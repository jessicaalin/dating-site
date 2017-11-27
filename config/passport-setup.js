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
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "/facebook/success",
      // error fix
      proxy: true
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
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
