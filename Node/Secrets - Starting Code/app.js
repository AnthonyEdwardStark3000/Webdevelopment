require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
// var encrypt = require('mongoose-encryption');//npm install mongoose-encryption
// const bcrypt = require('bcryptjs'); //npm install bcryptjs
const md5= require('md5');

const app = express();

console.log(process.env.API_KEY);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

// const secret ="DataTobeEncrypted"; moving this to .env file
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);

app.get("/",function(req, res){
    res.render("home");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req, res){
    res.render("register");
});

app.post("/register",function(req,res){
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password), //hashing function
  });

   newUser.save(function(err){
     if(!err)
     {
       res.render("secrets");
     }
     else {
       console.log(err);
     }
   });
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = md5(req.body.password);
    User.findOne({ email: username}, function(error, user){
        if(error){
            console.log(error);
        }else{
            if(user){
                // bcrypt.compare(password, user.password, function(err, result) {
                    // if(result === true){
                    if(user.password === password)
                    {
                        res.render("secrets");
                    }
                // });
              }
            }
        })
});

app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
