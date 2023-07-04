const { Router } = require("express");
const { Article } = require("./model")
const { isImageFile, isValidArticle } = require("./middleware");

const route = Router();
const path = require("path");
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");

route.get("/", (request, response) => {
    const filePath = path.resolve(__dirname, 'public/index.html');
    response.sendFile(filePath);
});

route.get("/all", async (request, response) => {
    const allArticles = await Article.find();
    response.json(allArticles)
})

route.get("/show/:id", async(request, response) => {
    const id = request.params.id;

    const articleToFind = await Article.findById(id);

    if(!articleToFind) return response.status(404).json({Message : `L'article avec l'id ${id} n'existe pas.`});

    response.json(articleToFind)
})

route.post("/upload", [isValidArticle, isImageFile], (request, response) => {
    const { body } = request;
    const { image } = request.files;

    // On change le nom de l'image en un nom unique grâce au UUID
    const fileName = uuidv4() + image.name;
    // On récupère le chemin absolue de l'image
    const absoluteImagePath = __dirname + '/upload/' + fileName;
    // On change le chemin absolue pour récupérer seulement le nom de l'image qui servira de chemin
    const imagePath = path.basename(absoluteImagePath); 

    // On déplace l'image dans le dossier upload
    image.mv(__dirname + '/upload/' + fileName); 
    
    // // On enregistre les données dans la base de données
    const newArticle = new Article({ title: body.title, content: body.content, image: imagePath });
    newArticle.save();
    response.json(newArticle);
});

route.delete("/delete/:id", async (request, response) => {
    const id = request.params.id;
    const articleToDelete = await Article.findByIdAndRemove(id);

    if(!articleToDelete) return response.status(404).json({Message : `L'article avec l'identifiant : ${id} n'existe pas.`});

    // On récupère le chemin de l'image
    const imagePath = __dirname + '/upload/' + articleToDelete.image;

    // Suppression de l'image et gérer le cas d'une erreur
    fs.unlink(imagePath, (error) => {
        if (error) {
          console.error('Erreur lors de la suppression du fichier d\'image :', error);
        } else {
          console.log('Fichier d\'image supprimé avec succès.');
        }
      });
      
    response.json({Message : `L'article avec l'identifiant ${id} a bien été supprimé.`});
})

module.exports = route;