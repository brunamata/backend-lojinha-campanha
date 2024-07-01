const ProductService = require('../services/ProductService');
const LojinhaException = require('../errors/LojinhaException');

class ComboValidator {

    static validateProduct(eh_combo, combo_products) {
        //valida se o combo tem produtos e se esses produtos existem na base
        if (eh_combo) {
            if (!combo_products || combo_products == []) {
                throw new LojinhaException("O combo precisa ter produtos", 400);
            } else {
                for (const product of combo_products) {
                    if (!(ProductService.findOne(product.nome))){
                        throw new LojinhaException("O produto " + product.nome + " não está cadastrado na base e por isso não pode fazer parte do combo :(", 400);
                    }
                }
            }
        } else {
            // só verifica se a pessoa colocou uma lista de produtos, mas esqueceu de marcar como combo
            if (combo_products) {
                throw new LojinhaException("Combos precisam ser marcados como true em eh_combo. Altere se isso foi um erro.", 400)
            }
        }
    }

}

module.exports = ComboValidator;