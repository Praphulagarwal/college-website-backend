const path = require('path');
const express = require('express');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');


const adminRoutes = require('./routes/admin');

const app = express();

mongoose.connect("mongodb+srv://praphul:oAFoGkREFwI0e6BK@cluster0-iwjdp.mongodb.net/user?retryWrites=true",{ useNewUrlParser: true })
  .then( () => {
    console.log('Connected to Database');
  })
  .catch( () => {
    console.log('Connection Failed');
  });

function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
      res.status(204).json({nope: true});
    } else {
      next();
    }
  }
app.use(ignoreFavicon);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});
  


app.use("/api/admin", adminRoutes);



module.exports = app;
// oAFoGkREFwI0e6BK