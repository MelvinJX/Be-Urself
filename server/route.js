const { Router } = require("express");
const { Article } = require("./model");

const route = Router();

route.post("/create-article", (request, response) => {
    const { body } = request;

    const newArticle = new Article(body);
    newArticle.save();

    response.json(newArticle);
})

route.get("/test", (request, response) => {
    response.json("ede");
})

module.exports = route;