const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

//Desc Login/Landing Page
//Route GET
router.get('/', ensureGuest, (req, res)=>{
  res.render("login",{
    layout: 'login'
  });
});

//Desc Dashboard
//Route GET/dashboard
router.get('/dashboard', (req, res)=>{
  res.render("dashboard");
});
module.exports = router;
