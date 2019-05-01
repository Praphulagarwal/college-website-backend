const express = require('express');

const Notice = require('../models/notice');

const router = express.Router();


router.post('/', (req,res,next) => {
    console.log(req.body);
 
  
  const notice = new Notice({
    noticesub: req.body.noticesub,
      notice: req.body.notice
  });
 
  notice.save();
  res.status(201).json({
      message: "Data Saved successfully"
  });
});

router.get('/',(req,res,next) => {
    Notice.find()
      .then(documents => {
          console.log(documents);
          res.status(200).json({
            message: "Post Retrieved Succesfully",
            notice: documents
      });
      
      });
});

module.exports = router;
