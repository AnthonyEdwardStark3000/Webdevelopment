const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({emp_id:Number,name:String,age:Number},{versionKey:false});
const employeeModel = mongoose.model("Employee",employeeSchema,"Employee");
mongoose.connect("mongodb://localhost:27017/checking");

employeeModel.remove({emp_id: 5},function(err)
{
  if(err)
  {
    console.log(err);
  }
  else {
    console.log("Deleted Successfully");
    mongoose.connection.close();
    }
});
