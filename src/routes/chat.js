const express = require('express');

const router = express.Router();

const Chat = require('../models/chat');
const User = require('../models/user');

// @route GET /chat
// @desc get list of chats for current user
// @access Private
router.get('/:userId', (req, res) => {
  // TODO: change param to current user(after login functionality)
  const currentUser = User.find({ _id: req.params.userId });
  Chat.find({ users: currentUser })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
