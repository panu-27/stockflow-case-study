const express = require('express');
const app = express();

const lowStockRoutes = require('./routes/lowStockAlerts');

app.use(express.json());
app.use('/api', lowStockRoutes);

module.exports = app;
