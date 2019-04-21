const mongoose = require('mongoose');

const principalSchema = mongoose.Schema({
   // _id: {type: String, required: true},
    imagePath: { type: String, required:true},
    content: { type: String, required: true}
    
  });

module.exports = mongoose.model('Principal' , principalSchema);