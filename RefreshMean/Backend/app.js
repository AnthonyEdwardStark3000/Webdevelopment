const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const postsRoutes = require('./Routes/posts');
// const userRoutes = require('./Routes/user');
const userRoutes = require('./Routes/user');

const mongoose = require('mongoose');
const app = express();


mongoose.connect("mongodb+srv://MeanUploader:BnO1s5n8iLje0vUU@cluster0.urlgy.mongodb.net/MeanUploader?retryWrites=true&w=majority").then(()=>{
  console.log("Connection with the MongoDb successful")
}).catch(()=>{
  console.log("MongoDb connection failed");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));// for displaying images based on path, import Path

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  next();
});



app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
