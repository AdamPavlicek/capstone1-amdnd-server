'use strict';
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();

const userData = require('./testData/userData');
const charData = require('./testData/charData');

const morganOption = (NODE_ENV === 'production') 
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

const whitelist = ['http://localhost:3000', 'http://my-project.com'];
const options = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/register',(req,res) =>{
  res.send('Hello, Register')
});

app.get('/login', (req,res) =>{
  res.send(JSON.stringify(userData.users[0].userName))
});

app.post('/login',(req,res) =>{
  const user_Ids = userData.users.map(id => id.userId);
  const user_names = userData.users.map(n => n.userName);
  const user_passwords = userData.users.map(p => p.password)
  res.send('hi there');
})
app.get('/charList', (req,res) =>{
  //res.send('Hello char list')
  res.send(JSON.stringify(charData))
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = {error: {message: 'server error'} };
  } else {
    console.error(error);
    response= {message: error.message, error};
  }
  res.status(500).json(response);
});

module.exports = app;