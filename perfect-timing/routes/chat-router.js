const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/chat', (req, res, next) => {
  if(req.user === undefined) {
    res.redirect("/");
    return;
  }
  res.render('user-views/chat');
});


module.exports = router;
