const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({emp_id:Number,name:String,age:Number},{versionKey:false});
// const employeeModel = mongoose.model("Employee",employeeSchema);
var employeeModel = mongoose.model('Employee', employeeSchema, 'Employee');
mongoose.connect("mongodb://localhost:27017/checking");


employeeModel.findOne(
  {emp_id:2},
  function(err,data){
  if(err)
  {
    console.log(err);
  }
  else {
    data.name="shahul";
    data.age=22;
    data.save(function(error){
      if(error)
      {
        console.log(err);
      }
      else {
        console.log("Updated");
      }
      mongoose.connection.close();
    });
  }
});
