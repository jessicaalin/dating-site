const sharedsession = require("express-socket.io-session");
const ChatModel = require("../models/chat-model");
const mySessionStore = require("../config/store-setup.js");
const passportSocketIo = require("passport.socketio");
const session = require("express-session");


function socketSetup(io){
  io.use(
    passportSocketIo.authorize({
      secret: "avoid errors",
      store: mySessionStore
    })
  );

  io.on('connection', function(socket){
    console.log('a USER connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      var newMsg = new ChatModel({
        msg: msg,
        owner: socket.request.user._id
      });
      newMsg.save(function(err) {
        if(err){
          console.log(err);
        } else{
          io.emit('chat message', msg);
        }
      });
    });
  });
}

module.exports = socketSetup;
