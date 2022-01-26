const {Product} = require('../models/product');
const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const mongoose = require("mongoose");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
}

router.get("/", async function(req, res){

  let filter ={};
  if(req.query.categories)
  {
    filter = {category:req.query.categories.split(',')};
  }

    const productList = await Product.find(filter).populate('category') ;
    // .select('name image -_id');

    if(!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
});
//for making the image uplaod
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");

    if(isValid)
    {
      uploadError = null
    }

    cb(uploadError, 'public/uploads') //making the file upload to the folder public / uploads
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`)
  }
})

const uploadOptions = multer({ storage: storage })


router.get("/:id",async function(req,res){
  const product = await Product.findById(req.params.id).populate('category');
  // ,function(err,data){
  //   if(err)
  //   {
  //     console.log(err);
  //     res.status(500);
  //     res.send("Unable to find the category");
  //   }
  // });
  if(!product)
  {
    res.status(500);
    res.send("Unable to find the category");
  }
  else {
    res.send(product);
  }
});

// router.post("/", uploadOptions.single("image"), async function(req, res){
//   let category = Product.findOne({category:req.body.category},function(err){
//     if(err)
//     {
//       console.log(err);
//       res.status(500);
//       res.send("Invalid Category");
//     }
// //   });
//     const fileName = file.filename; //for getting the image thats been uploaded
//     const basePath = "${req.protocol}://${req.get('host')}/public/uploads/" //for getting the http or other request i.e the hostpath for file upload
//     const product = new Product({
//         name: req.body.name,
//         description: req.body.description,
//         richDescription: req.body.richDescription,
//         image: fileName,
//         // "http://localhost:3000/public/uploads/" this is how the file path should be for images and for bringing it we have implemented few methods above
//         brand:req.body.brand,
//         price:req.body.price,
//         category: req.body.category,
//         countInStock: req.body.countInStock,
//         rating: req.body.rating,
//         numReviews: req.body.numReviews,
//         isFeatured: req.body.isFeatured
//     })
//      await product.save(function(err,data){
//       if(err)
//       {
//         console.log(err);
//         res.status(500);
//       }
//       else {
//         res.send(data);
//       }
//     });
// });

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Invalid Category');

    const file = req.file;
    if (!file) return res.status(400).send('No image in the request');

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    });

    product = await product.save();

    if (!product) return res.status(500).send('The product cannot be created');

    res.send(product);
});


router.put('/:id',uploadOptions.single('image'),async function(req, res){
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400);
       res.send("Invalid Product Id");
    }
    const category = await Category.findById(req.body.category);
    if(!category)
    {
    return res.status(400);
    res.send("Invalid Category");
    }
//what if the user wanted to update his existing image in the database so checking for any images with the put request
    const product = await Product.findById(req.body.product);
    if(!product)
    {
    return res.status(400);
    res.send("Invalid product");
    }

    const file = req.file;
    let imagePath;

    if(file)
    {
      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
      imagePath = `${basePath}${fileName}`
    }
    else {
      imagePath = product.image;
    }

    const updatedproduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true}
    );

    if(!updatedproduct)
    {
      return res.status(500).send('the product cannot be updated!');
    }
    res.send(updatedproduct);
});
router.delete("/:id",function(req,res){
  Product.deleteOne({_id:req.params.id},function(err,data){
    if(err)
    {
      res.status(500);
      res.send(err);
    }
    else {
      res.send("Product has been deleted Successfully");
    }
  });
});

// router.get("/get/count",async function(req,res){
//   const productCount = await Product.countDocuments((count)=> count)
//   if(!productCount)
//   {
//     res.status(500);
//   }
//   else {
//     res.send(productCount);
//   }
//
// }).clone();
router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments(function (count) {
      return count;
    }).clone();
    if(!productCount) {
        res.status(500).json({success: false})
    }
    res.send({
        productCount: productCount
    });
});
router.get(`/get/featured/:count`, async (req, res) =>{
  const count = req.params.count ? req.params.count :0;
    const products = await Product.find({isFeatured: true}).limit(+count);
    if(!products) {
        res.status(500).json({success: false})
    }
    res.send(products);
});

//to accept multiple images files and save it to the backend
router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    if (files) {
        files.map((file) => {
            imagesPaths.push(`${basePath}${file.filename}`);
        });
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!product) return res.status(500).send('the gallery cannot be updated!');

    res.send(product);
});
module.exports =router;
