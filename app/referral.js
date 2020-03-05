const express = require('express');
const ReferralRoute = express.Router();

// Referral model
let Referral = require('../models/Referral');

// Add Referral
ReferralRoute.route('/').post((req, res, next) => {
  Referral.create(req.body, (error, data) => {
    if (error) {
      res.json('err')
    } else {
      res.json('ok')
    }
  })
});

// Get All Referrals
ReferralRoute.route('/').get((req, res) => {
  Referral.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Referral
ReferralRoute.route('/:id').get((req, res) => {
  Referral.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Referral
ReferralRoute.route('/:id').put((req, res, next) => {
  Referral.findByIdAndUpdate(req.params.id, {
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

// Delete Referral
ReferralRoute.route('/:id').delete((req, res, next) => {
  Referral.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = ReferralRoute;