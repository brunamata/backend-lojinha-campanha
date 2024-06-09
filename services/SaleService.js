const SaleSchema = require("../schemas/Sale");
const moment = require('moment-timezone');

class SaleService {

    static async findAll() {
        const sales = await SaleSchema.find().sort({ data_hora: -1 });
        return sales;
    }

    static async create(sale){
        sale.data_hora = moment().tz('America/Sao_Paulo').format();

        const saleCreated = await SaleSchema.create(sale);
        return saleCreated;
    }


}

module.exports = SaleService;