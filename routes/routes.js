const { Router } = require("express");
// const upload = require("../config/multerConfig");
const ProductController = require("../controllers/ProductController");
const SaleController = require("../controllers/SaleController");

const routes = new Router();

// General
routes.get("/teste", (req, res) => res.send('{"nome": "LOJINHA DA CAMPANHA USP DO AGASALHO!"}'));

// Product
routes.get("/products", ProductController.findAll);
// routes.post("/products", upload.single('image'), ProductController.create);
// routes.put("/products", upload.single('imagem'), ProductController.updateProduct); //passar um json com nome + o q quer mudar

routes.post("/products", ProductController.create);
routes.put("/products", ProductController.updateProduct); //passar um json com nome + o q quer mudar
routes.delete("/products", ProductController.deleteProduct); //passar um json com o nome do produto a ser removido

// Sale
routes.get("/sales", SaleController.getAll);
routes.post("/sales", SaleController.create); //passar um json com os produtos vendidos com qtd e preco individual + preco total (pode ser calculado no back se precisar)


module.exports = routes;