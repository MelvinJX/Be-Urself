const { articleSchemaJoi } = require("./verif");
const path = require('path');

function isImageFile(request, response, next){
    const { image } = request.files;

    // Si l'image n'est pas de type image, alors renvoie une erreur
    if (!/^image/.test(image.mimetype)) return response.status(400).json({Message : "Veuillez choisir un fichier de type .jpeg, .png, .jpg."});

    next();
}

function isValidArticle(request, response, next) {
    // On récupère le body de la requête
    const { body } = request;
    // On récupère le fichier de la requête
    const files = request.files;
  
    // On vérifie si l'article est valide, on ne s'arrête pas à la première erreur (abortEarly: false)
    const { error } = articleSchemaJoi.validate(body, { abortEarly: false });
    if (error) {
      // Si l'article n'est pas valide, renvoyer le fichier 'articles.html'
      return response.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
    
    // Si on n'a pas pu récupérer le fichier de la requête, alors afficher l'erreur dans le formulaire.
    if (!files || !files.image) return response.json("Erreur image")
  
    next();
  }
  

module.exports.isImageFile = isImageFile;
module.exports.isValidArticle = isValidArticle;