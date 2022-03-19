//for user authentication implementing user login and signup
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.post("/signup", (req, res, _next)=>{
  bcrypt.hash(req.body.password, 10).then(hash =>{
    const user = new User({
      email: req.body.email,
      // password: req.body.password bad idea to store it as raw data as anybody can access it, use bcrypt.
      password: hash
    });
   user.save().then(result =>{
    res.status(201).json({
      message: 'User created !',
      result: result
    });
  }).catch(err =>{
    res.status(500).json({
    message: "Invalid authentication Details"
    })
    console.log(err);
  });
});
});
module.exports = router;
