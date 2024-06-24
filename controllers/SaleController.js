const SaleService = require("../services/SaleService");
const SaleValidator = require("../validators/SaleValidator");
const SaleUtils = require("../utils/SaleUtils");

class SaleController {

    static async getAll(req, res) {

        try{
            
            const allSales = await SaleService.findAll();

            if(!allSales){
                res.status(500).json({busca: "Erro na busca das vendas"})
            }

            res.status(200).json(allSales);
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }
    }

    static async create(req, res) {

        const sale = req.body

        try{

            await SaleValidator.validateSale(sale);
            
            const newSale = await SaleService.create(sale);

            if(!newSale){
                res.status(500).json({criação: "Erro na criação da vendas"})
            }

            await SaleUtils.updateProducts(sale);

            res.status(200).json(newSale);
        }
        catch(error) {
            res.status(500).json({message: error.message});
        }

    }
}

module.exports = SaleController;