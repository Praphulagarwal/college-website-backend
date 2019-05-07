const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const adminRoutes = require('./routes/admin');
const aboutRoutes = require('./routes/admin-about');
const placedStRoutes = require('./routes/admin-placedStudents');
const noticeRoutes = require('./routes/notice');
const acadCalRoutes = require('./routes/acad-cal');

const app = express();

mongoose.connect("mongodb+srv://praphul:NuoY1jkAWLTqG9If@cluster0-iwjdp.mongodb.net/user?retryWrites=true",{ useNewUrlParser: true })
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

app.use(bodyParser.json( ));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});



app.use("/api/admin", adminRoutes);
app.use("/api/dashboard/about/principal", aboutRoutes);
app.use("/api/dashboard/placements/stPlacement",placedStRoutes);
app.use("/api/dashboard",noticeRoutes);
app.use("/api/dashboard/academics/academics-calender",acadCalRoutes);


module.exports = app;
// oAFoGkREFwI0e6BK
