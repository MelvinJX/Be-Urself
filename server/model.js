const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
    title : String,
    content : String,
    image : String,
    date : { type : Date, default : Date.now() }
});

const Article = model("articles", articleSchema);

module.exports.Article = Article;