const { Router } = require("express");
const { Article } = require("./model")

const route = Router();
const path = require("path");

route.get("/form", (request, response) => {
    const filePath = path.resolve(__dirname, '../client/index.html');
    response.sendFile(filePath);
});

route.post("/formPost", (request, response) => {
    const { body } = request;

    const newArticle = new Article(body);
    newArticle.save();
    response.json(newArticle);
});

route.get("/formPost", (request, response) => {
    response.json("Test");
});

module.exports = route;