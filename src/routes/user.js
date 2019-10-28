const express = require('express');

const router = express.Router();
const User = require('../models/user');

// @route POST /signup
// @desc Register user
// @access Public
router.post('/signup', async (req, res) => {
  User.findOne({ email: req.body.email }).then(found => {
    if (found) {
      return res.status(400).json({ error: 'Email is already registered' });
    }
  });
  User.findOne({ username: req.body.username }).then(found => {
    if (found) {
      return res.status(400).json({ error: 'Username is already taken' });
    }
  });
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password in hex format
      password: req.body.password.toString(16),
    });
    const token = await newUser.generateAuthToken();
    newUser.save().then(user => res.json({ user, token }));
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});

// @route POST /signup
// @desc Login registered user
// @access Public
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const currUser = User.findByCredentials(email, password);
    const token = await currUser.generateAuthToken();
    res.send({ currUser, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
