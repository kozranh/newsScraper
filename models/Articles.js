// Dependency - Require Mongoose to create the schema for the articles
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
// Article Title
  title: {
		type: String,
		required: true
	},
// Link to the Article
	link: {
		type: String,
		required: true
	},
// Comments on the Article
	comment: {
		type: Schema.Types.ObjectId,
		ref: "Comments" // reference to Comments.js
	}
});
// Artilces Model
var Articles = mongoose.model("Articles", ArticleSchema);
module.exports = Articles;
