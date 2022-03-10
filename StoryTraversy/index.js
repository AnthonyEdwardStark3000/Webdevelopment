const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const morgan = require('morgan'); // for consolelogging the api calls and their respose status and response time
const passport = require('passport');
const session = require('express-session');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
//Load configuration files

dotenv.config({path: './config/config.env'});
const app = express();


//passport config after require
require('./config/passport')(passport);

//Logging

if(process.env.NODE_ENV==='development')
{
  app.use(morgan('dev'))
}

//Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

//sessions for express

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,

}))

//Middleware for passport
app.use(passport.initialize());
app.use(passport.session());


//Static folders
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/', require('./Routes/index'));
app.use('/auth', require('./Routes/auth'));

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
