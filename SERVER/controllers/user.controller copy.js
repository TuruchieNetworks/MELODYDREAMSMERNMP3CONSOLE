const User = require('../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;
const bcrypt = require('bcrypt')
// user.controller.js
const jwt = require("jsonwebtoken");

class UserController {
  register(req, res){
    const user = new User(req.body)
    user.save()
        .then(()=>{
          res.cookie('userToken', jwt.sign({ id: user._id }, SECRET_KEY, {httpOnly: true}))
        .json({ msg: "User Successfully Identified!", user: { _id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName, avatar: user.avatar } });
        })
        .catch(res.status(500).json({ error: 'Internal Server Error' }))
  }

  
}