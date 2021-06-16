const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv:alekay:mastadon@cluster0.kclkf.mongodb.net/ANGULAR-NODEJS-SERVER?retryWrites=true&w=majority');

// use dev token for morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());

module.exports = app;