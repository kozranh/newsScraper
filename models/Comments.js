// Dependency - Require Mongoose to create the schema for the articles
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  // Just a string
  title: {
    type: String
  },
  // Body of the comment
  body: {
    type: String
  }
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create the Note model with the NoteSchema
var Comments = mongoose.model("Comments", NoteSchema);

// Export the Note model
module.exports = Comments;
