const mongoose = require("mongoose");

const SaleProductSchema = mongoose.Schema({
    nome: {type: String, required: true},
    preco: {type: Number, required: true, min: 0},
    quantidade: {type: Number, required: true, min: 0}
})

const SaleSchema = mongoose.Schema({
  preco_total: {type: Number, required: true, min: 0},
  produtos: {type: [SaleProductSchema], required: true}
}, 
{
    timestamps: {
        createdAt: 'data_hora', 
        updatedAt: 'updated_at'
      }
}
);

// venda = {
//     data_hora: "",
//     preco_total: "",
//     produtos:[
//         {
//             nome: "",
//             preco_individual: "",
//             quantidade_individual: "",
//         },
//         {
//             nome: "",
//             preco_individual: "",
//             quantidade_individual: "",
//         }
//     ]
// }

module.exports = mongoose.model("Sale", SaleSchema);
