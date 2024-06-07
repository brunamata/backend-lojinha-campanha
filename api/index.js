const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('../routes/routes');

const PORT = 3002;
const mongoDB = "mongodb+srv://floquinho:campanhusp_2024@backend.ih9lomr.mongodb.net/LojinhaCampanha?retryWrites=true&w=majority&appName=Backend";

const app = express();

app.use(routes);

mongoose.connect(mongoDB).then( () => {
    console.log(" ::: MongoDB connected ::: ");
    app.listen(PORT, () => {
        console.log("Server ready on port " + PORT);
    })
});

app.get("/", (req, res) => res.send("Express on Vercel"))

module.exports = app;