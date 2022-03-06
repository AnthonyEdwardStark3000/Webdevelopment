const express = require('express');
const bodyParser = require('body-parser');
const PostModel = require('./models/post');
const mongoose = require('mongoose');
const app = express();


mongoose.connect("mongodb+srv://MeanUploader:BnO1s5n8iLje0vUU@cluster0.urlgy.mongodb.net/MeanUploader?retryWrites=true&w=majority").then(()=>{
  console.log("Connection with the MongoDb successful")
}).catch(()=>{
  console.log("MongoDb connection failed");
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.post('/api/posts', (req, res, next)=>{
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save().then(createdPost =>{
    // console.log(createdPost)
    res.status(201).json({ message: "Post Added Successfully", postId: createdPost._id});
  });
});

app.put('/api/posts/:id', (req, res , next)=>{
  const post = new PostModel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  PostModel.updateOne({_id: req.params.id}, post).then(result=>{
    console.log(result);
    res.status(200).json({message: 'Update Successful'});
  });
})

app.get('/api/posts',(req, res, next)=>{
  PostModel.find().then(documents=>{
    res.status(200).json({ message:"posts structured successfully", posts: documents });
  });
  console.log("Datas");
});



app.delete('/api/posts/:id',(req, res, next)=>{
  console.log(req.params.id);
  PostModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message: "Post Deleted successfully"});
  });
});
module.exports = app;
