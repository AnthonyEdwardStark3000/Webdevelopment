const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", async function(req, res){
    const userList = await User.find()
    // .select('name phone email')
    ;

    if(!userList) {
        res.status(500).json({success: false})
    }
    res.send(userList);
});

router.post("/", async function(req, res){
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin:req.body.isAdmin,
        street:req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city:req.body.city,
        country: req.body.country,
    });
     await user.save(function(err,data){
      if(err)
      {
        console.log(err);
        res.status(500);
      }
      else {
        res.send(data);
      }
    });
});
router.put('/:id',async function(req, res){
    const existingUser = await User.findById(req.params.id);
    let newPassword;
    if(req.body.password)
    {
      newPassword= bcrypt.hashSync(req.body.password,10);
    }
    else {
      newPassword = existingUser.password;
    }
    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          email: req.body.email,
          passwordHash: newPassword,
          phone: req.body.phone,
          isAdmin:req.body.isAdmin,
          street:req.body.street,
          apartment: req.body.apartment,
          zip: req.body.zip,
          city:req.body.city,
          country: req.body.country,
        },
        { new: true}
    );
    if(!user)
    {
      return res.status(500).send('User details cannot be updated!');
    }
    res.send(user);
});
router.get("/:id",async function(req,res){
  User.findOne({_id:req.params.id},function(err,data){
    if(err)
    {
      // res.send(err);
      res.status(404);
      res.send("Data not found");
      console.log(err);
    }
    else {
      res.send(data);
    }
  }).select('-passwordHash');
});

router.post("/login",async function(req,res){
  const user = await User.findOne({email:req.body.email});
  if(!user)
  {
    res.status(500);
    res.send("User doesnot exist");
  }
  console.log(user && bcrypt.compare(req.body.password, user.passwordHash));
  if(user && bcrypt.compareSync(req.body.password, user.passwordHash))
  {
    const token = jwt.sign({
      userId: user.id
    },'secret',{expiresIn:'1d'}
  )
    res.status(200);
    res.send({user: user.email, token: token});
  }
  else {
    res.status(400);
    console.log(req.body.password);
    console.log(user.passwordHash);
    res.send("invalid password");
  }
});

module.exports =router;
