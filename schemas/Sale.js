const mongoose = require("mongoose");

const SaleProductSchema = mongoose.Schema({
    nome: {type: String, required: true},
    preco: {type: Number, required: true, min: 0},
    quantidade: {type: Number, required: true, min: 0}
})

const SaleSchema = mongoose.Schema({
  data_hora: {type: String, required: true},
  preco_total: {type: Number, required: true, min: 0},
  produtos: {type: [SaleProductSchema], required: true}
}, 
);

module.exports = mongoose.model("Sale", SaleSchema);
