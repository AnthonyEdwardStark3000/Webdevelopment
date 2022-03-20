const express = require('express');
const router = express.Router();
const PostModel = require('../models/post');
const multer = require('multer'); //for file upload to server
const checkAuth = require('../middleware/check-auth'); // middleware for checking authentication, should be used before login
const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpg',
  'image/jpg' : 'jpg'
}; // for allowing only particular type of files.

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
    const ext = MIME_TYPE_MAP[file.mimetype]; //finding the file type i.e extension
    cb(null, name+'-'+Date.now()+'.'+ext);//callback to pass the information back to multer
  }
});

router.post('', checkAuth,//for Authentication
 multer({storage: storage}).single("image"), (req, res, next)=>{
  const url = req.protocol+'://'+req.get("host");
  const post = new PostModel({
    title: req.body.title,
    content: req.body.content,
    imagePath:  url+"/images/"+req.file.filename,
  });
  // console.log(post);
  post.save().then(createdPost =>{
    // console.log(createdPost)
    res.status(201).json({ message: "Post Added Successfully",
     post:
     {
       ...createdPost,
       //simple next gen way is to return an copy and the property that we need to override
        id: createdPost._id
        // title: createdPost.title,
        // content: createdPost.content,
        // imagePath: createdPost.imagePath,
     }});
  });
});

router.put('/:id', checkAuth,//for Authentication
 multer({storage: storage}).single("image"),(req, res , next)=>{
  let imagePath = req.body.imagePath;
  if(req.file)
  {
    const url = req.protocol+'://'+req.get("host");
    imagePath =  url+"/images/"+req.file.filename;
  }
  console.log(req.file);
  const post = new PostModel({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath
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
  // console.log(req.query);
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = PostModel.find(); //const created to store query as we may need to filter the search based on params of pagination
  let fetchedPosts;
  if(pageSize && currentPage)
  {
    console.log("Filtering");
    console.log(pageSize);
    console.log(currentPage);
    postQuery.skip(pageSize * (currentPage - 1 )).limit(pageSize); // for skipping the items of previous pages
  }
  else
  {
    console.log(pageSize);
    console.log("filtration failed");
  }
  postQuery.then(documents=>{
    // res.status(200).json({ message:"posts fetched successfully", posts: documents });
    fetchedPosts = documents;
    return PostModel.count();
  }).then(count=>{
    res.status(200).json({
    message:"posts fetched successfully",
    posts: fetchedPosts,
    maxPosts: count
  });
  });
   console.log("Data");
});



router.delete('/:id',(req, res, next)=>{
  console.log(req.params.id);
  PostModel.deleteOne({_id:req.params.id}).then(result=>{
    console.log(result);
    res.status(200).json({message: "Post Deleted successfully"});
  });
});

module.exports = router;
