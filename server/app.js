const express = require("express");
const fileUpload = require("express-fileupload");
const { connect } = require("mongoose");
require("dotenv").config();

const route = require("./route");

const URI = process.env.NODE_ENV === "production" ? process.env.BDD_PROD : process.env.BDD_DEV

connect(URI)
    .then(() => console.log("Connexion à MongoDB réussie."))
    .catch((ex) => console.log(ex))

const PORT = 4020;
const app = express();

app.use(express.json());
app.use(fileUpload({
    limits: {
        fileSize: 10000000 // Taille max du fichier : ~ 10MB
    },
    abortOnLimit: true
}));
app.use(express.urlencoded());
app.use(express.static(__dirname + "/upload"));
app.use(express.static(__dirname + '/public'));

app.use(route);

app.listen(PORT, () => console.log(`Express démarre sur le PORT : ${PORT} \n http://localhost:${PORT}`));