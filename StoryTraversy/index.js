const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
//Load configuration files

dotenv.config({path: './config/config.env'});
const app = express();

//Logging

if(process.env.NODE_ENV==='development')
{
  app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//Static folders
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require('./Routes/index'));

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
