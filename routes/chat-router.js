const express = require('express');

const ChatModel = require("../models/chat-model");

const router  = express.Router();


/* GET chat page. */
// 1. show chat page
router.get('/chat', (req, res, next) => {
  if(req.user === undefined) {
    res.redirect("/login");
    return;
  }
  res.render('user-views/chat');
});

// 2. process chats
router.post("/process-chat", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
  const theChat = new ChatModel({
    msg: req.body.chatMsg,
    // owner: req.user._id
  });
  theChat.save()
  .then(() => {
    // 3. redirect upon success
    res.redirect("/chat");
  })
  .catch((err) => {
    next(err);
  });
});

// this was ale's trick
// router.post("/process-chat", (req, res, next) => {
//   if (req.user === undefined) {
//     res.redirect("/login");
//     return;
//   }
//   const theChat = {
//     content: req.body.chatContent,
//     owner: req.user._id
//   };
//
//   const newChat = new ChatModel (theChat);
//   // theChat.save()
//   newChat.save( err => {
//     if ( err ) {
//       return next( err );
//     }
//     return res.redirect("/chat");
//   });
// });


module.exports = router;
