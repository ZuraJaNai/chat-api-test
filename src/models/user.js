const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  // token: { type: String, required: true },
});

// Hash the password before saving the user model
user.pre('save', async function(next) {
  const currUser = this;
  if (currUser.isModified('password')) {
    const bufStr = Buffer.from(currUser.password, 'utf8');
    currUser.password = bufStr.toString('hex');
  }
  next();
});

// Generate an auth token for the user
user.methods.generateAuthToken = async function() {
  const currUser = this;
  const token = jwt.sign({ _id: currUser._id }, process.env.JWT_KEY);
  // currUser.token = token;
  // currUser.save();
  return token;
};

// Search for a user by email and password.
user.statics.findByCredentials = async function(email, password) {
  const currUser = await this.findOne({ email });
  if (!currUser) {
    throw new Error({ error: 'Invalid email' });
  }
  const currPass = Buffer.from(currUser.password, 'hex').toString();
  const isPasswordMatch = password === currPass;
  if (!isPasswordMatch) {
    throw new Error({ error: 'Invalid password' });
  }
  return currUser;
};

const User = mongoose.model('User', user);

module.exports = User;
