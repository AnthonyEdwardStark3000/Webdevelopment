const mongoose = require('mongoose');
const MONGO_URI ="mongodb+srv://BradTraversyMedia:suresh@cluster0.urlgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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

module.exports = connectDB;
