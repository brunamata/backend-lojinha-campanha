const ProductSchema = require('../schemas/Product');

class ProductService {

    static async create(product){
        const productCreated = await ProductSchema.create(product);
        return productCreated;
    }

    static async findAll() {
        const products = await ProductSchema.find();
        return products;
    }

    static async findOne(productName) {
        const product = await ProductSchema.findOne({ nome: productName });
        return product;
    }

    static async updateProduct(product) {
        const productUpdated = await ProductSchema.findOneAndUpdate({ nome: product.nome }, product);
        return productUpdated;
    }

    static async deleteProduct(productName) {
        const productDeleted = await ProductSchema.findOneAndDelete({ nome: productName });
    }

    static async findAllCombos(productName) {
        const combosThatContainsProduct = await ProductSchema.find({
            eh_combo: true,
            combo_products: { $elemMatch: { nome: productName } }
          });
        return combosThatContainsProduct;
      }

}

module.exports = ProductService;