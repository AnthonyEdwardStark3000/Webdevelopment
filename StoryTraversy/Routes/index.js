const express = require('express');
const router = express.Router();

//Desc Login/Landing Page
//Route GET
router.get('/', (req, res)=>{
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
