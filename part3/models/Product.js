const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: { type: String, unique: true },
  name: String,
  price: mongoose.Schema.Types.Decimal128,
  lowStockThreshold: Number
});

module.exports = mongoose.model('Product', productSchema);
