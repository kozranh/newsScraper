// Dependencies
const express = require('express');
const router = express.Router();
const path = require('path');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Require our Articles and Comments Models
const Articles = require("./models/Articles.js");
const Comments = require("./models/Comments.js");

// Scraping Tools
var cheerio = require('cheerio');
var request = require('request');


// Scrape Route
app.get("/scrape", function(req, res) {
  // Make a request call to grab the HTML body from the site of your choice
  request("https://www.theatlantic.com/latest/", function(error, response, html) {

    var $ = cheerio.load(html);

    var result = {};
    // Look for the specified clas
    $("li.article").each(function(i, element) {
      // grab the link
      result.link = $(element).children().attr("href");
      // Grabbing the title requires going for the child of the child with class .hed
      result.title = $(element).children().children(".hed").text();

      //Use the Articles Model to add each new article
      var newArt = new Articles(result);

      //Add the new Article to the DB.  This will give it a unique ID.  Using array would have only given the array the ID, not the entry
      newArt.save(function(error, doc){
        if (error) {
          console.log(error);
        }
        else {
          console.log(doc);
        }
      });
    // Go back to the home page...or should we redirect to /articles after the scrape
    res.redirect('/')
  });
});

//Route to get all of the scraped articles
app.get("/articles", function (req, res) {
  Articles.Find({}, function (error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);  //Send as JSON for front end to populate
    }
  });
});

// Get the articles by article ID and populate with the comments
app.get("/articles/:id", function(req, res) {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db
  Article.findOne({ "_id": req.params.id })
  .populate("Comments")
  .exec(function(error, doc) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(doc);
    }
  });
});

app.post("/articles/:id", function(req, res) {
  // Create a new comment and pass the req.body to the entry
  var newComment = new Comments(req.body);

  // And save the comment to the db
  newCommment.save(function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      // Use the article id to find and update it's note
      Articles.findOneAndUpdate({ "_id": req.params.id }, { "Comments": doc._id })
      // Execute the above query
      .exec(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        else {
          // Or send the document to the browser
          res.send(doc);
        }
      });
    }
  });
});

// Export Router to server.js
module.exports = router;
