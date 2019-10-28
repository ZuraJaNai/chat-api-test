const express = require('express');

const router = express.Router();

const Message = require('../models/message');
const Chat = require('../models/chat');

// @route GET /message/:messageId
// @desc Get message by id
// @access Private
router.get('/:messageId', (req, res) => {
  Message.findById(req.params.messageId)
    .then(results => res.status(200).json(results))
    .catch(err => res.status(500).json(err));
});

// @route POST /message
// @desc Create new message,
//       request body must contain message and chatId
// @access Private
router.post('/', (req, res) => {
  Message.create({
    user: req.user.id,
    message_body: req.body.message,
  })
    .then(response => {
      Chat.updateOne(
        { _id: req.body.chatId },
        { $push: { messages: response._id } },
      );
      res.status(201).json(response);
    })
    .catch(err => res.status(500).json(err));
});

// @route PUT /message/:messageId
// @desc Update existing message
//       request body must contain new message
// @access Private
router.put('/:messageId', (req, res) => {
  Message.updateOne(
    { _id: req.params.messageId },
    { $set: { message_body: req.body.message } },
  )
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
