const express = require('express');
const LocationRoute = express.Router();

// Location model
let Location = require('../models/Location');

// Add Location
LocationRoute.route('/').post((req, res, next) => {
  Location.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Locations
LocationRoute.route('/').get((req, res) => {
  Location.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Locations are loaded")
      console.log(data);
      res.json(data)
      
    }
  })
})

// Get single Location
LocationRoute.route('/:id').get((req, res) => {
  Location.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Location
LocationRoute.route('/:id').put((req, res, next) => {
  Location.findByIdAndUpdate(req.params.id, {
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

// Delete Location
LocationRoute.route('/:id').delete((req, res, next) => {
  Location.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = LocationRoute;