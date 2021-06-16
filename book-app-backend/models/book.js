// bring in mongoose
const mongoose = require('mongoose');

// define schema for user model
const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: String,
  isbn: Number,
  price: {
    type: Number,
    required: true
  }
});

// export book schema
module.exports = mongoose.model('Book', bookSchema);