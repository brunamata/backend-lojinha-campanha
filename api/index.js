const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');
const routes = require('../routes/routes');

const PORT = process.env.PORT;
const mongoDB = process.env.MONGO_DB_URL;

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