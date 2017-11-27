const session = require("express-session");

const mySessionStore = new session.MemoryStore();

module.exports = mySessionStore;
