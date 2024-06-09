const ProductService = require("../services/ProductService");
const LojinhaException = require("../errors/LojinhaException");
const yup = require('yup');

class SaleValidator {

    static async validateSale(sale) {

        await this.#validateSchema(sale);

        const products = sale.produtos;

         if (!products) {
            throw new LojinhaException("Uma venda precisa ter produtos.", 400);
        } else {
            for (const product of products) {
                if (!(await ProductService.findOne(product.nome))){
                    throw new LojinhaException("O produto " + product.nome + " não está cadastrado na base e por isso não pode fazer parte de uma venda :(", 400);
                }
            }
        }

        this.#validatePrice(products, sale.preco_total);


    }

    static async #validateSchema(sale) {

        const productSchema = yup.object().shape({
            nome: yup.string().required(),
            preco: yup.number().positive().required(),
            quantidade: yup.number().positive().integer().required()
        });

        const schema = yup.object().shape({
            preco_total: yup.number().positive().required(),
            produtos: yup.array().of(productSchema).min(1).required()
        });

        try {
            await schema.validate(sale);
        } catch (error) {
            throw new LojinhaException("O formato da venda não é válido, erro: " + error.message, 400);
        }
    }

    // verifica se o preço total está certo, considerando as quantidades inseridas.
    static #validatePrice(products, total_price) {

        let calculed_total_price = 0.0;

        for (const product of products) {
            calculed_total_price += (product.quantidade * product.preco);
        }

        if (calculed_total_price != total_price) {
            throw new LojinhaException("O preço total não coincide com as quantidades individuais dos produtos", 400);
        }

    }
}

module.exports = SaleValidator;