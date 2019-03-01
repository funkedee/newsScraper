// require packages
const axios = require("axios");
const cheerio = require("cheerio");

var db = require("../models");

const articles = [];
module.exports = function (app) {
    // GET route to view articles from scrape
    app.get("/", function (req, res) {
        res.render("index", {
            articles: articles
        });
    });

    // GET route for scraping the nytimies.com
    app.get("/scrape", function (req, res) {
        // axios call to get nytimes html
        axios.get("https://www.nytimes.com/").then(function (response) {
            // scrape html for title, link and summary 
            var $ = cheerio.load(response.data);
            $("article a").each(function (i, element) {
                // save title, link and summary in result
                var result = {};
                result.title = $(this).children("div").children("h2").children("span").text();
                result.link = "https://www.nytimes.com" + $(this).attr("href");
                result.summary = "";
                $(this).children("ul").children("li").each(function (i, elm) {
                    result.summary += $(this).text() + " ";
                })
                if (result.title != "") {
                    articles.push(result);
                }
            });
            res.redirect("/")
        });
    });

    // route for clearing articles
    app.get("/clear", function (req, res) {
        articles.length = 0;
        res.redirect("/");
    })
    // Route for getting all Articles from the db
    app.get("/articles", function (req, res) {
        // TODO: Finish the route so it grabs all of the articles
        // db.Article.find({}).then(function (dbArticle) {
        //     res.json(dbArticle);
        // });
    });

    // post route for saving articles to db
    app.post("/save-article", function (req, res) {
        db.Article.create(req.body)
            .then(function (dbArticle) {
                console.log(dbArticle);
                res.send("Article succesfully saved");
            })
            .catch(function (err) {
                console.log(err);
            });
    })

    // get route for getting saved articles from db
    app.get("/saved-articles", function(req, res) {
        db.Article.find({}).then(function(dbArticle) {
            console.log(dbArticle)
            res.render("saved-articles", {articles: dbArticle});
        })
        .catch(function (err) {
            console.log(err);
        });
    });

    // post route for adding note to article in db
    app.post("/add-note/:id", function(req, res) {
        console.log(req.body)
        db.Article.updateOne({_id: req.params.id}, {$push: {notes: req.body.note}})
        .then(function(dbArticle) {
            res.redirect("/saved-articles");
        })
        .catch(function(err) {
            console.log(err);
        });
    });

    // route to delete note
    app.post("/delete-note/:id/:note", function(req, res) {
        console.log(req.params.index)
        db.Article.updateOne({_id: req.params.id}, {$pull: {notes: req.params.note}})
        .then(function(dbArticle) {
            res.redirect("/saved-articles");
        })
        .catch(function(err) {
            console.log(err)
        });
    });
};