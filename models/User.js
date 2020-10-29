const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  sender : {
    type:String,
    require: true,
  },

  name: {
    type: String,
    required: true,
  },

  gender: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
  },

  residence: {
    type: String,
    required: true,
  },

  height: {
    type: Number,
    required: true,
  },

  weight: {
    type: Number, 
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
