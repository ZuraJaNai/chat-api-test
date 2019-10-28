const mongoose = require('mongoose');

const message = new mongoose.Schema({
  message_body: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', message);
module.exports = Message;
