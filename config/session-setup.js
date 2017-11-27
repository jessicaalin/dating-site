const session = require('express-session');

const mySession = session ({
    resave: true,
    saveUnintialized: true,
    secret: "avoid errors"
  });

module.exports = mySession;
