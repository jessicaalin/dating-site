const sharedsession = require("express-socket.io-session");
const ChatModel = require("../models/chat-model");
const mySession = require("../config/session-setup.js");


function socketSetup(io){
  io.use(
    sharedsession(mySession, {
      autoSave: true
    })
  );

  io.use(function(data, accept) {
    console.log("--------------------------");
    console.log(data.request.headers);
    accept(null, true);
  });

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
        // owner: req.user._id
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
