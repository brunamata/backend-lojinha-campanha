const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
  nome: { type: String, required: true, unique: true },
  descricao: { type: String, required: false },
  preco: { type: Number, required: true },
  quantidade_estoque: { type: Number, required: true },
  eh_combo: { type: Boolean, required: true }
});


// Export model
module.exports = mongoose.model("Product", ProductSchema);
