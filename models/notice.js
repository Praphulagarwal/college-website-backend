const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
   // _id: {type: String, required: true},
    noticesub: {type: String, required: true},
    notice: { type: String, required: true}
    
  });

module.exports = mongoose.model('Notice' , noticeSchema);