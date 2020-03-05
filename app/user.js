const express = require('express');
const UserRoute = express.Router();

// User model
let User = require('../models/User');

// Add User
UserRoute.route('/').post((req, res, next) => {
  User.find({ email: req.body.email }, (error, data) => {
    if (data.length === 0) {
      User.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data);
          console.log('User Created successfully')
        }
      })
    }
    else {
      res.json('ID_err')
    }
  })
});

// Get All Users
UserRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data);
      console.log('User Read successfully')
    }
  })
});

// Get single User
UserRoute.route('/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log('User Read successfully')
    }
  })
});

// Login
UserRoute.route('/login').post((req, res, next) => {
  console.log(req.body);
  if (req.body.email == null || req.body.password == null || req.body.email == '' || req.body.password == '') {
    console.log('User Login Info error');
    res.json('err');
  }
  else {
    User.find(req.body, (error, data) => {
      if (data.length === 0) {
        var ret = {"ret": 1};
        res.json(ret);
        console.log('User Login error')
      }
      else {
        let user = data[0];

        req.session.loginFlag = 1;//session variable represents whether the user logs in or not.

        var ret = {"ret": 0, user: user};
        res.json(ret);
        console.log('User Login successfully: ' + JSON.stringify(ret))
      }
    })
  }

});

// Update User
UserRoute.route('/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('User updated successfully')
    }
  })
});

// Delete User
UserRoute.route('/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      });
      console.log('User Deleted successfully')
    }
  })
});

module.exports = UserRoute;
