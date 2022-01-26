const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  orderItems:
  [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'OrderItem',
    required: true
  }], //there can be several items so array is used
  //the order item in the models will also have the same structure as order.js
  //thats the base i.e about an single order and we are refering that here
  shippingAddress1:{
    type:String,
    required:true
  },
  shippingAddress2:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  zip:{
    type:String,
    required:true
  },
  country:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true
  },
  status:{
    type:String,
    required:true,
    default:"Pending"
  },
  totalPrice:{
    type:Number,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  dateOrdered:{
    type:Date,
    default: Date.now
  }
});


//for converting _id to id virtuals
orderSchema.virtual('id').get(function(){
  return this._id.toHexString();
});
orderSchema.set('toJSON',{
  virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);
