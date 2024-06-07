const ProductSchema = require('../model/Product');

class ProductService {

    static async create(body){
        console.log("to na service");
        const product = await ProductSchema.create(body);

        return product;
    }


}

module.exports = ProductService;