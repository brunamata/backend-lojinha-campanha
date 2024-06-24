const ProductService = require("../services/ProductService");

class SaleUtils {

    static async updateProducts(sale) {
        const products = sale.produtos;

        for (const product of products) {
            const p = await ProductService.findOne(product.nome)

            if(p.eh_combo){
                const combo_products = p.combo_products;

                for (const combo_product of combo_products) {

                    const pp = await ProductService.findOne(combo_product.nome);
                    pp.quantidade_estoque = pp.quantidade_estoque - (product.quantidade*combo_product.quantidade)
                    
                    await ProductService.updateProduct(pp)
                }

            } else {
                p.quantidade_estoque = p.quantidade_estoque - product.quantidade
                await ProductService.updateProduct(p)
            }

        }

    }

}

module.exports = SaleUtils;