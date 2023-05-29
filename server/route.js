const { Router, response } = require("express");
const { Article } = require("./model")
const { isImageFile, isValidArticle } = require("./middleware");

const route = Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");

route.get("/", (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html');
    response.sendFile(filePath);
});

route.get("/all", async (request, response) => {
    const allArticles =  await Article.find();
    response.json(allArticles);
})

route.post("/upload", [isValidArticle, isImageFile], (request, response) => {
    const { body } = request;
    const { image } = request.files;

    const fileName = uuidv4() + image.name; // On change le nom de l'image en un nom unique grâce au UUID
    const absoluteImagePath = __dirname + '/upload/' + fileName; // On récupère le chemin absolue de l'image
    const imagePath = path.basename(absoluteImagePath); // On change le chemin absolue pour récupérer seulement le nom de l'image qui servira de chemin

    image.mv(__dirname + '/upload/' + fileName); // On déplace l'image dans le dossier upload
    
    // On enregistre les données dans la base de données
    const newArticle = new Article({ title: body.title, content: body.content, image: imagePath });
    newArticle.save();
    response.json(newArticle);
});

module.exports = route;