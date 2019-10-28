const express = require('express');

const router = express.Router();
const User = require('../models/user');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/signup', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: 'Email is already registered' });
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password in hex format
      password: req.body.password.toString(16),
    });

    return newUser
      .save()
      .then(returnedUser => res.json(returnedUser))
      .catch(saveErr => console.log(saveErr));
  });
});

module.exports = router;
