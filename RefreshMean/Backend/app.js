const express = require('express');
const bodyParser = require('body-parser');
const PostModel = require('./models/post');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(
  mongodb+srv://<username>:<password>@cluster0.urlgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
 );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

app.post('/api/posts', (req, res, next)=>{
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);

  res.status(201).json({ message: "Post Added Successfully"});
});

app.use('/api/posts',(req, res, next)=>{
  const posts = [
    {
      id:"121sjkdsnd",
      title: "First title",
      content: "First Content"
    },
    {
      id:"121casdasdaasd",
      title: "Second title",
      content: "Second Content"
    },
    {
      id:"121scjdbhkjsdf",
      title: "Third title",
      content: "Third Content"
    }
  ];
  console.log("Datas");
  res.status(200).json({ message:"posts structured successfully", posts: posts });
});

module.exports = app;
