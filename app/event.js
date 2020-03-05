const express = require('express');
const EventRoute = express.Router();

// Event model
let Event = require('../models/Event');

// Add Event
EventRoute.route('/').post((req, res, next) => {
  Event.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Events
EventRoute.route('/').get((req, res) => {
  Event.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({e_date:-1}); 
})

// Get single Event
EventRoute.route('/:id').get((req, res) => {
  Event.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Event
EventRoute.route('/:id').put((req, res, next) => {
  Event.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Event Data updated successfully')
    }
  })
})

// Update Event Register
EventRoute.route('/register/:id').put((req, res, next) => {
  Event.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      var tmp_obj = data;
      if(req.body.email == null || req.body.contact == null || req.body.email == '' || req.body.contact == ''){
        tmp_obj.interested.push(req.body);
      }
      else {
        tmp_obj.registered.push(req.body);
      }

      Event.findByIdAndUpdate(req.params.id, { $set: tmp_obj }, (error, data) => {
        if (error) {
          return next(error);
          console.log(error)
        } else {
          res.json(data)
          console.log('Event register updated successfully')
        }
      })

    }
  })
  
})

// Delete Event
EventRoute.route('/:id').delete((req, res, next) => {
  Event.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = EventRoute;