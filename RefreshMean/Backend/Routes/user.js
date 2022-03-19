//for user authentication implementing user login and signup
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post("/login", (req, res, next)=>{
  let fetchedUser;
  User.findOne({email: req.body.email}).then(user=>{
    if(!user){
      return res.status(401).json({
        message: "User Authentication Failed"
      });
    }
    fetchedUser = user;
    //we cannot decrypt so we are comparing by encrypting register with login
    return bcrypt.compare(req.body.password, user.password);
  }).then(result=>{
    if(!result){
      return res.status(401).json({
        message: "Auth failed"
      })
    }

    //creating JWT after all the verification is fine
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, "secret_for_json_web_token_and_it_should_be_as_long_as_possible",
    {expiresIn: '1h'});
    res.status(200).json({
      token: token
    })
  }).catch(err=>{
    return res.status(401).json({
      message: "User Authentication Failed"
    });
  });
});
module.exports = router;
