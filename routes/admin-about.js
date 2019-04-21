const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const Principal = require('../models/about');

const MIME_TYPE_MAP = {
   "image/png" : "png",
   "image/jpeg" : "jpeg",
   "image/jpg" : "jpg"
};

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Inalid Mime Type');
        if(isValid) {
            error = null;
        }
        cb(error, "images");
    },
    filename: (req , file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name);
      }
});

router.post('/', multer({storage: storage}).single('image'), (req,res,next) => {
    console.log(req.body);
  const url = req.protocol + '://' + req.get("host");
  
  const principal = new Principal({
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename
      
  });
  console.log(url);
  principal.save();
  res.status(201).json({
      message: "Post added successfully"
  });
});

router.get('/',(req,res,next) => {
    Principal.find()
      .then(documents => {
          console.log(documents);
          res.status(200).json({
            message: "Post Retrieved Succesfully",
            principal: documents
      });
      
      });
});
module.exports= router;