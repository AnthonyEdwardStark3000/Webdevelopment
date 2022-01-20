const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
// require('dotenv/config');

app.use(cors());
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
app.use(`/users`, usersRoutes);
app.use(`/orders`, ordersRoutes);

//Database
mongoose.connect("mongodb://localhost/E-commerce");
//Server
app.listen(3000,function(){
    console.log('server is running http://localhost:3000');
});
