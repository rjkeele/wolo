const express = require('express');
const ServiceRoute = express.Router();

// Service model
let Service = require('../models/Service');

// Add Service
ServiceRoute.route('/').post((req, res, next) => {
  Service.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
  // console.log(req.file)
});

// Get All Services
ServiceRoute.route('/').get((req, res) => {
  Service.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  }).sort({e_date:-1}); 
})

// Get single Service
ServiceRoute.route('/:id').get((req, res) => {
  Service.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Service
ServiceRoute.route('/:id').put((req, res, next) => {
  Service.findByIdAndUpdate(req.params.id, {
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

// Delete Service
ServiceRoute.route('/:id').delete((req, res, next) => {
  Service.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = ServiceRoute;