const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // for preventing the repeated of account saving
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
userSchema.plugin(uniqueValidator); // for making use of the unique id validation
module.exports = mongoose.model('User', userSchema);
