const cors = require("cors");
const express = require("express");
const route = require("./route");
const { connect } = require("mongoose");
require("dotenv").config();

const URI = process.env.NODE_ENV == "production" ? process.env.BDD_PROD : process.env.BDD_DEV

connect(URI)
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch((ex) => console.log(ex))

const PORT = 4020;
const app = express();

app.use(cors());
app.use(express.json())
app.use(route);

app.listen(PORT, () => console.log(`Express démarre sur le PORT : ${PORT} \n http://localhost:${PORT}`));