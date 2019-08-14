// Dependencies
const express = require('express');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require our Articles and Comments Models
const Articles = require("./models/Articles.js");
const Comments = require("./models/Comments.js");

// Scraping Tools
var cheerio = require('cheerio');
var request = require('request');

//Initialize Express
const app = express();

// Initiate body-parser for the app
app.use(bodyParser.urlencoded({
  extended: false
}));

// Express-Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Make public a static dir
app.use(express.static("public"));

// if else statement to use localhost if not being hoseted on Herko
//  Seemed helpful for development without having to switch code repeatedly
// credit to davesrose for the if/else setup
if(process.env.NODE_ENV == 'production'){

  mongoose.connect('mongodb://heroku_cslh0zn6:4ng0b98nh1j97mpffs421eqb1l@ds139954.mlab.com:39954/heroku_cslh0zn6');
}
else{
  mongoose.connect('mongodb://localhost/newsScraper');
}

const db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import Routes/Controller
const router = require('./controllers/controller.js');
app.use('/', router);


// Launch App
const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});
