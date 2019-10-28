const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const user = require('./src/routes/user');
const chat = require('./src/routes/chat');
const message = require('./src/routes/message');
const auth = require('./src/middleware/auth');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .set('useNewUrlParser', true)
  .set('useFindAndModify', false)
  .set('useCreateIndex', true)
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', user);
app.use('/chat', auth, chat);
app.use('/message', auth, message);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
