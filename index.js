'use strict';

// This file connets to Mongo directly; this will be what we are testing against. 

// Turn us into ES6!!
require('babel-register');
require('dotenv').config();

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindandModify: false,
};
mongoose.connect(process.env.MONGODB_URI, options);
// This will require our "app.js" file and immediately call its 'start' method, sending the port from our .env
require('./src/app.js').start(process.env.PORT);
