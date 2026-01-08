const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  name: String,
  companyId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Warehouse', warehouseSchema);
