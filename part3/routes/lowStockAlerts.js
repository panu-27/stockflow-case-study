const express = require('express');
const router = express.Router();

const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const Warehouse = require('../models/Warehouse');
const Supplier = require('../models/Supplier');
const Sale = require('../models/Sale');

router.get('/companies/:companyId/alerts/low-stock', async (req, res) => {
  const { companyId } = req.params;

  try {
    // Get warehouses of company
    const warehouses = await Warehouse.find({ companyId });

    const warehouseIds = warehouses.map(w => w._id);

    // Get inventory for those warehouses
    const inventories = await Inventory.find({
      warehouseId: { $in: warehouseIds }
    });

    const alerts = [];

    for (let item of inventories) {
      const product = await Product.findById(item.productId);

      if (!product) continue;

      // Low stock check
      if (item.quantity >= product.lowStockThreshold) continue;

      // Recent sales check (last 30 days)
      const recentSale = await Sale.findOne({
        productId: product._id,
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
      });

      if (!recentSale) continue;

      const supplier = await Supplier.findOne(); // assumed primary supplier

      alerts.push({
        product_id: product._id,
        product_name: product.name,
        sku: product.sku,
        warehouse_id: item.warehouseId,
        current_stock: item.quantity,
        threshold: product.lowStockThreshold,
        days_until_stockout: Math.floor(item.quantity / 1),
        supplier: supplier ? {
          id: supplier._id,
          name: supplier.name,
          contact_email: supplier.contactEmail
        } : null
      });
    }

    res.json({
      alerts,
      total_alerts: alerts.length
    });

  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch low stock alerts'
    });
  }
});

module.exports = router;
