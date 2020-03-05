const express = require('express');
const PracticeRoute = express.Router();

// Practice model
let Practice = require('../models/Practice');

// Add Practice
PracticeRoute.route('/').post((req, res, next) => {
    Practice.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
    // console.log(req.file)
});

// Get All Practices
PracticeRoute.route('/').get((req, res) => {
    Practice.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({e_date:-1});
});

// Get single Practice
PracticeRoute.route('/:id').get((req, res) => {
    Practice.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// Update Practice
PracticeRoute.route('/:id').put((req, res, next) => {
    Practice.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Data updated successfully')
        }
    })
});

// Delete Practice
PracticeRoute.route('/:id').delete((req, res, next) => {
    Practice.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = PracticeRoute;
