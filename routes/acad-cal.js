const express = require('express');

const AcadCalender = require('../models/acad-cal');

const router = express.Router();


router.post('/', (req,res,next) => {
    console.log(req.body);
 
  
  const acadCal = new AcadCalender({
      date: req.body.date,
      day: req.body.day,
      activity: req.body.activity
  });
 
  acadCal.save();
  res.status(201).json({
      message: "Event Saved successfully"
  });
});

router.get('/',(req,res,next) => {
    AcadCalender.find()
      .then(documents => {
          console.log(documents);
          res.status(200).json({
            message: "Event Retrieved Succesfully",
            acadCal: documents
      });
      
      });
});


module.exports= router;