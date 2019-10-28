const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./src/routes/users');
const { dbURI } = require('./src/config/mongodb');

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
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Routes
app.use('/', users);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
