const UserController = require('../controllers/user.controller');
// const express = require('express')
// const { check, validationResult } = require('express-validator/check');
// inside of user.routes.js
const { authenticate } = require('../config/jwt');
module.exports = app => {
  // No authorization required for user creation
  app.post('/api/users', UserController.createNewUser);
  
  // Authentication reserverd for the following routes
  app.post("/api/login", UserController.loginUser);
  app.get("/api/users", UserController.findAllUsers);
  app.get('/api/users/:id', UserController.findOneSingleUser);
  app.patch('/api/users/:id', authenticate, UserController.updateExistingUser);
  app.delete('/api/users/:id', authenticate, UserController.deleteAnExistingUser);
};

// Direct Method
// app.post('/api/users',[
//   check('firstName', 'Name is required!')
//   .not()
//   .isEmpty(),

//   check('lastName', 'Name is required!')
//   .not()
//   .isEmpty(),

//   check('email', 'Please include a valid email!')
//   .not()
//   .isEmail(),
  
//   check('password', 'Please enter a password with 6 or more characters!')
//   .not()
//   .isLength({ min: 6 }),
// ],(req, res) => {
//   const errors = validationResult(req);
//   if(!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }


// })