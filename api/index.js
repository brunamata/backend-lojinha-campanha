const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const routes = require('../routes/routes');
const LojinhaException = require("../errors/LojinhaException");

dotenv.config();
const PORT = 3002;
const mongoDB = "mongodb+srv://floquinho:campanhusp_2024@backend.ih9lomr.mongodb.net/LojinhaCampanha?retryWrites=true&w=majority&appName=Backend";

const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(routes);

mongoose.connect(mongoDB).then( () => {
    console.log(" ::: MongoDB connected ::: ");
    app.listen(PORT, () => {
        console.log("Server ready on port " + PORT);
    });
}).catch(error => {
    throw new LojinhaException("Erro ao conectar no mongo DB => " + error);
})

app.get("/", (req, res) => res.send("Express on Vercel"))

module.exports = app;