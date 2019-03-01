// require and setup mongoose
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// model for article
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    notes: {
        type:[String]
    }
});

// create model using mongoose
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;