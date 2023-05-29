const { articleSchemaJoi } = require("./verif");

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
  
    // Si on n'a pas pu récupéré le fichier de la requête, alors retourne une erreur.
    if (!files || !files.image) return response.status(400).json({ error: 'L\'image est manquante ou n\'a pas été correctement téléchargée.' });
  
    const { image } = files;
  
    // On vérifie si l'article est valide, on ne s'arrête pas à la première erreur (abortEarly: false)
    const { error } = articleSchemaJoi.validate(body, { abortEarly: false });
    if (error) return response.status(400).json(error.details);
  
    next();
}
  

module.exports.isImageFile = isImageFile;
module.exports.isValidArticle = isValidArticle;