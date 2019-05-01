const mongoose = require('mongoose');


const placedStudentSchema = mongoose.Schema({
    stName: { type: String, required: true },
    viewBranch: { type: String, required: true},
    company: { type: String, required: true},
    batch: { type: Number, required: true},
    packages: { type: Number, required: true}
});



module.exports = mongoose.model('PlacedStudent' , placedStudentSchema);