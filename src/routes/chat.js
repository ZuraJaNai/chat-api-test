const express = require('express');

const router = express.Router();

const Chat = require('../models/chat');
const User = require('../models/user');

// @route GET /chat
// @desc Get list of chats for current user
// @access Private
router.get('/', (req, res) => {
  Chat.find({ users: req.user.id })
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

// @route POST /chat/(userId)
// @desc create new chat with another user
// @access Private
router.post('/:userId', (req, res) => {
  Chat.create({
    users: [req.user.id, req.params.userId],
  })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
