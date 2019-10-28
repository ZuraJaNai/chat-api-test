const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const user = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Hash the password before saving the user model
user.pre('save', async function(next) {
  const currUser = this;
  const bufStr = Buffer.from(currUser.password, 'utf8');
  console.log(user.password);
  console.log(bufStr.toString('hex'));
  currUser.password = bufStr.toString('hex');

  next();
});

user.methods.generateAuthToken = async function() {
  // Generate an auth token for the user
  const currUser = this;
  const token = jwt.sign({ _id: currUser._id }, process.env.JWT_KEY);
  return token;
};

// Search for a user by email and password.
user.static.findByCredentials = async (email, password) => {
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
