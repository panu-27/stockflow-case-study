const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sale', saleSchema);
