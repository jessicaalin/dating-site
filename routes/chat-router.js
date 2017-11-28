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
  // ChatModel
  // .find()
  // .limit(10)
  // .sort({dateAdded: -1})
  // .exec()
  // .then((chatFromDb) => {
  //   res.locals.chatResults = chatFromDb;
  //   res.render('user-views/chat');
  // })
  // .catch((err) => {
  //   next(err);
  // });
  // PLUG THIS INTO CHAT.EJS LINE 5
  // <% chatResults.forEach((oneChat) => { %>
  //   <p><%=oneChat.msg%></p>
  // <%})%>
});

// 2. process chats
router.post("/process-chat", (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
    return;
  }
});



module.exports = router;
