const { Router } = require("express");
const { Article } = require("./model")

const route = Router();

route.get("/form", (request, response) => {
    response.sendFile(__dirname + '../client/index.html');
});

route.post("/formPost", (request, response) => {
    const { body } = request;

    const newArticle = new Article(body);
    newArticle.save();
    response.json(newArticle);
});

module.exports = route;