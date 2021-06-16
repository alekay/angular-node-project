// brign in express, mongoose, bcrpt
const express = require('express');
const router = express.router();

const mongoose = require('mongoose');

// define User 
const User = require('../../models/user');

const bcrypt = require('bcrypt');

// get package for using JWTs "jot"
const jwt = require('jsonwebtoken');

// route for sign-uo
router.post('/signup', (req, res, next) => {
  // checking if the email already exists
  console.log('req.body.email')
  User.find({ email: req.body.email })
  .exec().then(user => {
    // checking if the user exists
    if(user.lenght >= 1) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    } else { /* if there is an error*/
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json ({
            error: err
          })
        }  else {
          // creating an instance of User Model
          const user = new User({
            // we will let mongo generate the id, json object
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash,
            name: req.body.name,
            user_type: 'user',
          })
          user.save()
          .then(result => {
            res.status(201).json({
              message: 'User created successfully'
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'Failure to create user',
              error: err
            });
          });
        } 
      })
    }
  })
})

// add admin sign-up, uses 
router.post('/admin/signup', (req, res, next => {
  console.log('req.body.email')
  User.find({ email: req.body.email })
  .exec().then(user => {
    if (user.lenght >=1) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    } 
    else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) {
          return res.status(500).json({
            error: err
          })
        } else {
          const user = new User ({
            _id: new mongoose.Types.ObjectId(),
            error: req.body.email,
            password: hash,
            name: req.body.name,
            user_type: admin
          })
          user.save
          .then(result => {
            res.status(201).json({
              message: 'Admin successfuly created'
            });
          })
          .catch(err => {
            res.status(500).json({
              message: 'Failure to create admin',
              error: err
            });
          });
        }
      })
    }
  })
}))