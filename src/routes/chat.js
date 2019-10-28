const express = require('express');

const router = express.Router();

const Chat = require('../models/chat');

// @route GET /chat
// @desc Get list of chats for current user
// @access Private
router.get('/', (req, res, next) => {
  Chat.find({ users: req.user.id })
    .then(results => {
      req.body.response = results;
      res.status(200);
      next();
    })
    .catch(err => res.status(500).json(err));
});

// @route POST /chat
// @desc create new chat with another user,
//       request body should contain userId
// @access Private
router.post('/', (req, res, next) => {
  Chat.create({
    users: [req.user.id, req.body.userId],
  })
    .then(results => {
      req.body.response = results;
      res.status(201);
      next();
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
