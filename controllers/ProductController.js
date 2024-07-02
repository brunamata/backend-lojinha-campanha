const ProductService = require('../services/ProductService');
const LojinhaException = require('../errors/LojinhaException');
const ComboValidator = require('../validators/ComboValidator');

class ProductController {

    static async create(req, res) {

        try{

            // console.log("fileee ", req.file);
            console.log(req.body);

            const ehCombo = !!req.body.eh_combo;
            const combo_products = req.body.combo_products;
            // const imagem_url = req.file.path || ""; 

            ComboValidator.validateProduct(ehCombo, combo_products);
            
            // const product = await ProductService.create({...req.body, imagem_url: imagem_url});
            const product = await ProductService.create(req.body);

            if(!product){
                res.status(500).json({criacao: "erro ao criar produto novo."})
            }

            res.status(200).json(product);
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }
    } 

    static async findAll(req, res) {

        try{
            
            const allProducts = await ProductService.findAll();

            if(!allProducts){
                res.status(404).json({busca: "Erro na busca dos produtos"})
            }

            res.status(200).json(allProducts);
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }
    } 

    static async updateProduct(req, res) {

        try{

            ComboValidator.validateProduct(req.body.eh_combo, req.body.combo_products)
            
            const product = await ProductService.updateProduct(req.body);

            if(!product){
                res.status(500).json({busca: "Erro na atualização do produto"})
            }

            res.status(200).json(product);
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }
    } 

    static async deleteProduct(req, res) {

        const nome = req.body.nome;

        try{
            
            await ProductService.deleteProduct(nome);

            const combosAssociatedToProduct = await ProductService.findAllCombos(nome);
            let returnMessage = "Sucesso na remoção! :)";

            // verifica se o produto a ser removido faz parte de algum combo, e então remove esse(s) combo(s)
            if (combosAssociatedToProduct) {
                for (const combo of combosAssociatedToProduct) {
                    await ProductService.deleteProduct(combo.nome);
                    returnMessage = returnMessage + "  -->  Combo [" + combo.nome + "] removido com sucesso."
                }
            }
            
            res.status(200).json({message: returnMessage});
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }
    } 

}

module.exports = ProductController;