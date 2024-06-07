const ProductService = require('../services/ProductService');
const LojinhaException = require('../errors/LojinhaException');

class ProductController {

    static async create(req, res) {

        try{
            
            const product = await ProductService.create(req.body);

            if(!product){
                console.log("erro ao criar novo produto.");
                res.status(500).json({criacao: "erro ao criar produto novo."})
            }

            res.status(200).json(product);
        }
        catch(error) {
            console.log(error)
            res.status(500).json({message: error.message});
        }
    } 

}

module.exports = ProductController;