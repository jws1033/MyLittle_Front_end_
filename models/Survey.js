const mongoose = require("mongoose");
const { Schema } = mongoose;

const surveySchema =  new Schema({
    no : {
      type:Number,
      require: true,
    },
  
    question: [{
      type: String,
      required: true,
    }]
})

module.exports = mongoose.model("Survey", surveySchema);