const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
//Load configuration files

dotenv.config({path: './config/config.env'});
const app = express();
//Access from .env
// const PORT = process.env.PORT;
connectDB();
const PORT = 3000;
app.listen(PORT,function(err){
    console.log(`App started at Port`);
    if(err)
    {
        console.log(err);
    }
});
