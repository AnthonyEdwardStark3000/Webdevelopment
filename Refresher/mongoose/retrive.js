const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  emp_id:Number,
  name:String,
  age:Number
});
var employeeModel = mongoose.model("Employee",employeeSchema);
mongoose.connect("mongodb://localhost:27017/checking");
employeeModel.find({age: {$gt:18}},function(err,variable){
  if(err)
  {
    console.log(err);
  }
  else {
    console.log("Inside the retrive");
    mongoose.connection.close();
    console.log(variable);
    for(var i=0;i<variable.length;i++)
    {
      console.log(variable[i].name+" :"+variable[i].age+" years old");
    }
  }
});
