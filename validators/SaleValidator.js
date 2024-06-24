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
        await this.#validateAmount(products);


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

    static async #validateAmount(products) {

        for (const product of products) {
            const p = await ProductService.findOne(product.nome)

            //validação para combo
            if(p.eh_combo){
                const p_products = p.combo_products;
                for (const combo_product of p_products) {
                    const pp = await ProductService.findOne(combo_product.nome)

                    // se a quantidade que tem em estoque for menor do que o que eu quero comprar
                    // quantidade de combos que quero * quantidade do produto que vem no combo
                    if(pp.quantidade_estoque < product.quantidade * combo_product.quantidade) {
                        throw new LojinhaException(`Não há quantidades suficientes de [${product.nome}] em estoque. O produto [${pp.nome}] tem estoque = ${pp.quantidade_estoque}`);
                    }
                }
            }
            // validação para produto comum
            else {
                if (p.quantidade_estoque < product.quantidade){
                    throw new LojinhaException(`Não há quantidades suficientes de [${product.nome}] em estoque (em estoque = ${p.quantidade_estoque})`);
                }
            }
        }

    }
}

module.exports = SaleValidator;