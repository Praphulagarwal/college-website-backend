const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Admin = require('../models/admin')

const router = express.Router();

router.post('/signup', (req,res,next) => {
    console.log(req.body);
    
 bcrypt.hash(req.body.cpassword, 10)
 .then( hash => {
    const admin = new Admin({
        email: req.body.email,
        password: hash,
        cpassword: hash,
        branch: req.body.branch
    });
    console.log(admin);
    admin.save()
       .then(result => {
          res.status(201).json({
              message: 'User Created',
              result: result
            });
        })
       .catch( err => {
           res.status(500).json({
               error: err
            });
        });
    });
  
});

router.post('/login',(req, res, next) => {
    let fetchedUser;
    Admin.findOne({ email: req.body.email})
          .then( user => {
            console.log(user);
             if (!user) {
                 
                 return res.status(401).json({
                     message: 'Auth failed'
                 });
             }
             fetchedUser= user;
            return bcrypt.compare(req.body.password, user.cpassword);
          })
          .then(result => {
              console.log(result);
              if (!result) { 
              return res.status(401).json({
                  message: 'Auth Failed'
              });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                 "this_should_be_so_long_so_that_only_who_create_it_can_destroy_it",
                 { expiresIn: "1h" }
                 );
                 res.status(200).json({
                     token: token
                 });
          })
          .catch(err => {
              res.status(401).json({
                  message: 'Auth Failed',
                  error: err
              });
          });

});

module.exports = router;