require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
// var encrypt = require('mongoose-encryption');//npm install mongoose-encryption

// const bcrypt = require('bcryptjs'); //npm install bcryptjs
// const saltRounds = 10;
// const md5= require('md5');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate= require('mongoose-findorcreate');
const app = express();

console.log(process.env.API_KEY);

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'something that is an secret',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

// mongoose.set("useCreateIndex", true);
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  googleId: String,
  secret: String
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// const secret ="DataTobeEncrypted"; moving this to .env file
// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

  passport.serializeUser(function(user,done){
    done(null, user.id);
  });
  passport.deserializeUser(function(id, done){
      User.findById(id,function(err,user){
        done(err, user);
      });
  });

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID, //from the env file
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"//for some deprecation error
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/",function(req, res){
    res.render("home");
});

app.get("/auth/google",
  passport.authenticate("google", {scope: ["profile"]}));

app.get("/auth/google/secrets",
  passport.authenticate('google', { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    res.redirect("/secrets");
  });

app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req, res){
    res.render("register");
});

app.get("/secrets", function(req, res){
  // if (req.isAuthenticated()){
  //   console.log("Rendered");
  //   res.render("secrets");
  // } else {
  //     console.log(req.isAuthenticated());
  //     res.redirect("/login");
    // res.render("secrets");
  // }
  User.find({"Secret": {$ne: null}}, function(err,founduser){
    if(err)
    {
      console.log(err);
    }
    else {
      if(founduser)
      {
        res.render("secrets", { userswithSecrets: founduser});
      }
    }
  });
});

app.get("/submit",function(req,res){
  if (req.isAuthenticated()){
    res.render("submit");
  } else {
      // console.log(req.isAuthenticated());
      res.redirect("/login");
    }
});

app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/");
  console.log("Logout");
  }
);

app.post("/register",function(req,res){

  // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  //     // Store hash in your password DB.
  //     const newUser = new User({
  //       email: req.body.username,
  //       // password: md5(req.body.password), //hashing function
  //       password: hash
  //     });
  //
  //      newUser.save(function(err){
  //        if(!err)
  //        {
  //          res.render("secrets");
  //        }
  //        else {
  //          console.log(err);
  //        }
  //      });

  // });
  User.register({username: req.body.username}, req.body.password, function(err, user){
   if (err) {
     console.log(err);
     res.redirect("/register");
   } else {
     passport.authenticate("local")(req, res, function(){
       res.redirect("/secrets");
     });
   }
 });

});
app.post("/submit",function(req,res){
  const submittedSecret = req.body.secret;
  User.findById(req.user.id,function(err,founduser){
    if(err)
    {
      console.log(err);
    }
    else {
      if(founduser)
      {
        founduser.secret = submittedSecret;
        founduser.save(function(){
          res.redirect("/secrets");
        });
      }
    }
  });
});


app.post("/login", function(req, res) {
    // const username = req.body.username;
    // // const password = md5(req.body.password);
    // const password = req.body.password;
    // User.findOne({ email: username}, function(error, user){
    //     if(error){
    //         console.log(error);
    //     }else{
    //         if(user){
    //             // bcrypt.compare(password, user.password, function(err, result) {
    //                 // if(result === true){
    //                 // if(user.password === password)
    //                 // {
    //                 bcrypt.compare(password, user.password, function(err, result) {
    //                   // result == true
    //                   if(result==true){
    //                      res.render("secrets");
    //                   }
    //                   else {
    //                     console.log("Wrong password ");
    //                   }
    //                 });
    //                     // res.render("secrets");
    //                 // }
    //             // });
    //           }
    //         }
    //     })
    const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){ //Defined function to login
    if (err){
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  });
});

app.listen(3000,function(req,res){
  console.log("App started at port 3000");
});
