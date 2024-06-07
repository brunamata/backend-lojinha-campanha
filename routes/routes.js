const { Router } = require("express");
const ProductController = require("../controllers/ProductController");

const routes = new Router();

routes.get("/teste", (req, res) => res.send('{"nome": "LOJINHA DA CAMPANHA USP DO AGASALHO!"}'));

routes.post("/mongo", ProductController.create);

module.exports = routes;