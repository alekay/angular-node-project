// bring in mongoose
const mongoose = require('mongoose');

// define schema for user model
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, 
  email: {
    type: String,
    required: true,
    unique: true,
    // match for regex
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  user_type: String
});

// export user model schema
module.exports = mongoose.model('User', userSchema);