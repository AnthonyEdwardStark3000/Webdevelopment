const {Order} = require('../models/order');
const {OrderItem} = require('../models/order-item');
const express = require('express');
const router = express.Router();

router.get("/", async function(req, res){
    const orderList = await Order.find().populate('user','name').sort({'dateOrdered':-1}).populate({ path:'orderItems', populate:{ path:'product',populate:'category'}}); //Admin needs user details so using the populate () and 'user'
    //he not needs the full user details object just an username would be fine so using the 'name' after 'user'
    //sort('dateOrdered') is used to sort the users based on their order date,changed to {'dateOrdered':-1} for displaying new order first

    if(!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList);
}
);
router.get("/:id", async function(req, res){
    const order = await Order.findById(req.params.id).populate('user','name')
    .populate({ path:'orderItems', populate:{ path:'product',populate:'category'}}); //Admin needs user details so using the populate () and 'user'
    //he not needs the full user details object just an username would be fine so using the 'name' after 'user'
    //sort('dateOrdered') is used to sort the users based on their order date,changed to {'dateOrdered':-1} for displaying new order first
    //.populate({ path:'orderItems', populate:'product'}); first orderItems is displayed as an array and to display the field product which has detailed information regarding product this is used.
    //chenged a bit to show the category details instead of displaying its address
    if(!order) {
        res.status(500).json({success: false})
    }
    res.send(order);
}
);
// router.post("/",async function(req,res){
//
//   const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem=>{
//     let newOrderItem = new OrderItem({
//       quantity: orderItem.quantity,
//       product: orderItem.product
//     });
//     newOrderItem = await newOrderItem.save();
//     return newOrderItem._id;
//   }));  //this method is done for quantity i.e mobile * 2 should not deserve the user to enter twice.
router.post('/', async (req,res)=>{
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) =>{
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))
    const orderItemsIdsResolved =  await orderItemsIds;

    const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice
    }))
    console.log(totalPrices);
    const totalPrice = totalPrices.reduce((a,b) => a +b , 0); //reduce is an easy method to get the sum of all elements in an array.
    console.log(totalPrice);
    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    })
    order = await order.save();

    if(!order)
    return res.status(400).send('the order cannot be created!')

    res.send(order);
})

//to change the status of the orders placed
router.put("/:id",function(req,res){
  Order.findOne({_id:req.params.id},function(err,data){
    if(err)
    {
      console.log(err);
      res.status(500);
      res.send("Updation of Data failed");
    }
    else {
    data.status = req.body.status;
      data.save(function(err,data){
        if(err)
        {
          console.log(err);
          res.send(err);
        }
        else {
          res.send(data);
        }
      });
    }
  });
});
//to delete an order
router.delete("/:id",function(req,res){
  Order.deleteOne({_id:req.params.id},function(err,data){
    if(err)
    {
      res.status(500);
      res.send(err);
    }
    else {
      res.send("Order has been deleted Successfully");
    }
  });
});

//to display the total sales in our shop
router.get("/get/totalsales", async function(req,res){
  const totalSales = await Order.aggregate([
    {
      $group :{ _id:null ,totalsales : { $sum: '$totalPrice'}}
      //grouping id and totalPrice already generated .id is set to null as its impossible to send without an id and the totalPrice will be sent in the name of totalsales
    }
  ]);
  if(!totalSales)
  {
     res.status(400);
     res.send("The Order Sales cannot be generated");
  }
  else {
    res.send({ totalsales: totalSales.pop().totalsales});//.pop() is used as it is an array here
    // console.log(totalSales);
  }
});

//to display the total order count
router.get(`/get/count`, async (req, res) =>{
    const orderCount = await Order.countDocuments(function (count) {
      return count;
    }).clone();
    if(!orderCount) {
        res.status(500).json({success: false})
    }
    res.send({
        orderCount: orderCount
    });
});

//user needs to see his order history during login so
router.get("/get/userorders/:userid", async function(req, res){
    const userOrderList = await Order.find({user: req.params.userid})
    .populate({ path:'orderItems', populate:{ path:'product',populate:'category'}}).sort({'dateOrdered':-1})
     //Admin needs user details so using the populate () and 'user'
    //he not needs the full user details object just an username would be fine so using the 'name' after 'user'
    //sort('dateOrdered') is used to sort the users based on their order date,changed to {'dateOrdered':-1} for displaying new order first

    if(!userOrderList) {
        res.status(500).json({success: false})
    }
    res.send(userOrderList);
}
);
module.exports =router;
