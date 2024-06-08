const mongoose = require("mongoose");

const ComboProductSchema = mongoose.Schema({
  nome: {type: String, required: true},
  quantidade: {type: Number, required: true, min: 0}
})

const ProductSchema = mongoose.Schema({
  nome: { type: String, required: true, index: true, unique: true },
  descricao: { type: String, required: false },
  preco: { type: Number, required: true, min: 0 },
  quantidade_estoque: { type: Number, required: false, min: 0},
  eh_combo: { type: Boolean, required: true },
  combo_products: {type: [ComboProductSchema], required: false}
});


// Export model
module.exports = mongoose.model("Product", ProductSchema);
