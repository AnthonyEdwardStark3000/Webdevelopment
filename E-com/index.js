const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv/config');
require('dotenv').config() //for using the .env file

const authJwt= require('./helpers/jwt');//jwt for the authentication
const errorHandler = require('./helpers/error-handler'); //importing the error handler function that we defined to give proper error message during auth error

app.use(cors());
app.use(authJwt());//method exported from the helpersfolder->jwt.js
//The authJwt will return error if an unautherized token is entered and will return an stinky message and to make it an meaningful findOne
//the function is written
app.use(errorHandler);// method to display the error meaningful one  //alter the token using insomnia to check it.


app.options('*', cors())

//middleware
app.use(bodyParser.json());
// app.use(morgan('tiny'));


//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

// const api = process.env.API_URL;
console.log(process.env.API_URL);
app.use(`/categories`, categoriesRoutes);
app.use(`/products`, productsRoutes);
app.use("/users", usersRoutes);
app.use(`/orders`, ordersRoutes);

//Database
mongoose.connect("mongodb://localhost/E-commerce");
//Server
app.listen(3000,function(){
    console.log('server is running http://localhost:3000');
});
