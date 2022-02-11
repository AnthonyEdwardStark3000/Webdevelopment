const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();



// const router = require('./Router/route')
mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/api",router);
app.get("/",function(req,res)
{
  res.send("Hi")
})

//schema definition

const ContactSchema = mongoose.Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  phone:{
    type: Number,
    required: true
  },
});

const Contact =  mongoose.model("Contact",ContactSchema)
//CRUD

app.post('/contacts',function(req,res)
{
  // mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true});
  const newContact = new Contact({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone
  });
    newContact.save(function(err){
      if(err)
      {
        console.log(err);
        res.status(500);
        res.send("Failed to save the Data");
        // mongoose.connection.close();
      }
      else {
        console.log("Data inserted successfully");
        res.send("New contact added successfully");
        // mongoose.connection.close();
      }
    });
});

//READ

app.get('/contacts',function(req,res)
{
  // mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true});
  Contact.find(function(err,data){
    if(err)
    {
      console.log(err);
      // mongoose.connection.close();
    }
    else {
      res.send(data);
      // mongoose.connection.close();
    }
  })
});

//update
app.put("/contacts/:id",function(req,res){
  Contact.findOne({_id:req.params.id},function(err,data){
    if(err)
    {
      res.status(500);
      res.send(err);
    }
    else {
      data.firstName = req.body.firstName;
      data.lastName = req.body.lastName;
      data.phone = req.body.phone;
      data.save(function(err){
        if(err)
        {
          res.status(500);
          res.send(err);
        }
        else {
          res.send("Data updated Successfully");
        }
      })
    }
  });
})

//Delete

app.delete('/contacts/:id',function(req,res)
{
  // mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true});
  Contact.deleteOne({_id: req.params.id},function(err,result){
    if(err)
    {
      console.log(err);
      res.status(500);
      res.send("Error deleting the data");
      // mongoose.connection.close();
    }
    else {
      console.log("Deleted the data");
      res.send("Deleted the product");
      // mongoose.connection.close();
    }
  })
});

app.listen(3000,function(){
  console.log("App started at port 3000");
});
