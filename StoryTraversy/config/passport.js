const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const user = require('../models/User');

module.exports = function(passport){ //catching the passed passport as an argument in index.js
  passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURl : '/auth/google/callback', //check in the google cloud platform credentials for confirming the callback URL
  },
async(accessToken, refreshToken, profile, done)=>{
  console.log(profile);
}));
passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    done(err, user);
  })
})
}
