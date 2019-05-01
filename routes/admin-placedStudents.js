const express = require('express');

const PlacedStudent = require('../models/placedStudent');

const router = express.Router();


router.post('/', (req,res,next) => {
    console.log(req.body);
 
  
  const placedStudent = new PlacedStudent({
      stName: req.body.stName,
      viewBranch: req.body.viewBranch,
      company: req.body.company,
      batch: req.body.batch,
      packages: req.body.packages
  });
 
  placedStudent.save();
  res.status(201).json({
      message: "Data Saved successfully"
  });
});

router.get('/',(req,res,next) => {
    PlacedStudent.find()
      .then(documents => {
          console.log(documents);
          res.status(200).json({
            message: "Post Retrieved Succesfully",
            placedStudent: documents
      });
      
      });
});


module.exports= router;