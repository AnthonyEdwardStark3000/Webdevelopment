const express = require('express');
const router = express.Router();
const PostModel = require('../models/post');
const multer = require('multer'); //for file upload to server
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    //for additional security or type generic the following type validation
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if(isValid)
    {
      error= null;
    }
    //for additional security or type generic the following type validation
    cb(error, "backend/images"); //error and destination for callback function
  },
  filename: (req, file, cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype]; //finding the file type
    cb(null, name+'-'+Date.now()+'.'+ext);//callback to pass the information back to multer
  }
});

router.post('',multer(storage).single("image"), (req, res, next)=>{
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

router.put('/:id', (req, res , next)=>{
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

router.get('/:id', (req, res, next)=>{
  PostModel.findById(req.params.id).then(post =>{
    if(post){
      res.status(200).json({message: post});
    }
    else{
      res.status(404).json({message: 'Post not found'});
    }
  });
})

router.get('',(req, res, next)=>{
  PostModel.find().then(documents=>{
    res.status(200).json({ message:"posts structured successfully", posts: documents });
  });
  console.log("Datas");
});



router.delete('/:id',(req, res, next)=>{
  console.log(req.params.id);
  PostModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message: "Post Deleted successfully"});
  });
});

module.exports = router;
