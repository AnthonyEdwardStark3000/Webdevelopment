const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
//Load configuration files

dotenv.config({path: './config/config.env'});
const app = express();
//Access static data from .env
const PORT = process.env.PORT;
connectDB();

app.listen(PORT,function(err){
    console.log(`App started at Port${PORT}`);
    if(err)
    {
        console.log(err);
    }
});
