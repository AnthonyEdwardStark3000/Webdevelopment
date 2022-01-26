const mongoose = require('mongoose');

const orderItemSchema = mongoose.Schema({
  quantity:{
    type: Number,
    required: true
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    //the individual product should have a reference to the product schema
    ref:'Product'
  }
});

exports.OrderItem = mongoose.model('OrderItem', orderItemSchema);
