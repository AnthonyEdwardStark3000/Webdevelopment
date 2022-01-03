const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true});
const fruitSchema = new mongoose.Schema({
  name: String,
  rating: Number,
  review: String
});

const Fruit = mongoose.model("Fruit",fruitSchema);
const Apple = new Fruit (
  {
  name: "Apple",
  rating:10,
  review:"Nice"
});

const Orange = new Fruit(
  {
  name: "Orange",
  rating:8,
  review:"Great"
}
);
const Pineapple = new Fruit(
  {
  name: "Pineapple",
  rating:9,
  review:"Awesome"
  }
);


// fruit.save();
Fruit.insertMany([Apple, Orange, Pineapple],function(err)
{
  if(err)
  {
    console.log(err);
  }

  console.log("Insertion success");
})
// const peopleschema = new mongoose.Schema({
//   name: String,
//   age: Number
// });
//
// const People = mongoose.model("People",peopleschema);
// const people = new People({
// name: "Mr.Stark",
// age:21
// });
//
// people.save();

Fruit.find(function(err, fruits){
  console.log("Trying to read the data from the database");
  if(err)
  {
    console.log(err);
  }
  else {
    mongoose.connection.close();
    // console.log(fruits);
    fruits.forEach(function(fruit)
    {
      console.log(fruit.name);
    })
  }
});
