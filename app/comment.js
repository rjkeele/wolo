const express = require('express');
const CommentRoute = express.Router();

// Comment model
let Comment = require('../models/Comment');

// Add Comment
CommentRoute.route('/').post((req, res, next) => {
  var body = req.body
  body["updated_at"] = new Date()
  Comment.create(body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get Comments for location id
CommentRoute.route('/:loc_id').get((req, res) => {
  Comment.find({ loc_id: req.params.loc_id }, null, { sort: { updated_at: -1 } }, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Comment
CommentRoute.route('/:id').put((req, res, next) => {
  Comment.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Comment
CommentRoute.route('/:id').delete((req, res, next) => {
  Comment.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = CommentRoute;