const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
// const MONGO_URI ="mongodb+srv://BradTraversyMedia:suresh@cluster0.urlgy.mongodb.net/StoryBooks?retryWrites=true&w=majority";
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async() =>{
  try{
    const conn = await mongoose.connect(MONGO_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false
    });

    console.log(`MongoDB connected: ${conn.connection.host}`)
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}
console.log(MONGO_URI);
module.exports = connectDB;
