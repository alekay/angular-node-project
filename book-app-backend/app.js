const express = require('express');
const app = express();

const bookRoutes = require('./api/routes/books');
const userRoutes = require('./api/routes/user');

const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// import from MongoDB Atlas
// TODO fix API connection
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://alekay:mastadon@cluster0.kclkf.mongodb.net/Angular-nodeJS-Server?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// use dev token for morgan
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json());
