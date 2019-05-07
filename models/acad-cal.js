const mongoose = require('mongoose');

const acadCalenderSchema = mongoose.Schema({
   // _id: {type: String, required: true},
    date: { type: String, required:true},
    day: { type: String, required: true},
    activity: { type: String, required: true}
    
  });

module.exports = mongoose.model('AcadCalender' , acadCalenderSchema);