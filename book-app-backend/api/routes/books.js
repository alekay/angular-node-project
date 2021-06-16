const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Book = require('../../models/book');


//view books
router.get('/all-books', checkAuth, (req, res, next) => {
  Book.find()
  .exec()
  .then(docs => {
    const response = {
      books: docs.map(doc => {
        return {
          title: doc.title,
          author: doc.author,
          _id: doc._id,
          isbin: doc.isbin,
          price: doc.price,
        };
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// view specific book by Id
router.get('/book-details/:bookId', checkAuth, (req,res,next) => {
  Book.find({_id:id})
  .exec()
  .then(docs => {
    const response = {
      books: doc.map(doc => {
        return {
          title: doc.title,
          author: doc.author,
          _id:doc.id,
          isbn: doc.isbn,
          price:doc.price,
        };
      })
    };
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).jsonn({
      error:err
    });
  });
});

// add (create) new book
router.post('/add-book', checkAuth, (req, res, next) => {
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    title:req.body.title,
    author:req.body.author,
    isbn:req.body.isbn,
    price:req.body.price,
  });
  book
  .save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      message:"book successfully added",
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json( {
      error:err
    });
  });
});

// update book by Id
router.patch('/update-book/:bookId', checkAuth, (req, res, next) => {
  const id = req.params.bookId;
  const updateOps = {}
  console.log(req.body);

  Book.update({_id:id}, {$set:req.body})
  .exec()
  .then(result => {
    res.status(200).jason({
      message: "Book Updated"
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

// delete book
router.delete('/delete-book/:bookId', checkAuth, (req, res, next) => {
  const id = req.params.bookId;
  console.log(id);
  Book.remove({_id:id})
  .exec()
  .then(result => {
    res.status(200).json({
      message: "Book Deletet",
    });
  })
  .catch(err => {
    res.status(500).json({
      error:err
    });
  });
});

// make sure it is viewable
module.exports = router;