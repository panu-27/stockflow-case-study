const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: String,
  contactEmail: String
});

module.exports = mongoose.model('Supplier', supplierSchema);
