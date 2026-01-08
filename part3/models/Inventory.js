const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  warehouseId: mongoose.Schema.Types.ObjectId,
  quantity: Number
});

module.exports = mongoose.model('Inventory', inventorySchema);
