const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({emp_id:Number,name:String, age:Number},{versionKey:false});
const employeeModel = mongoose.model("Employee",employeeSchema);
mongoose.connect("mongodb://localhost:27017/checking");
var employee = new employeeModel({name:"Mahadevan",age:21});
var employee2 = new employeeModel({name:"check",age:22});
var employee3 = new employeeModel({name:"check2",age:22});
employee3.save(function(err){
  if(err)
  {
    console.log(err);
  }
  else {
    console.log("insertion Successful");
  }
});

employeeModel.find(function(err,data){
  if(err)
  {
    console.log(err);
  }
  else {
    console.log(data);
    mongoose.connection.close();
  }
});
