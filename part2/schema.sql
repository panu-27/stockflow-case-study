-- Companies
CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Warehouses
CREATE TABLE warehouses (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  name VARCHAR(255) NOT NULL
);

-- Products
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  low_stock_threshold INTEGER
);

-- Inventory (product per warehouse)
CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  warehouse_id INTEGER REFERENCES warehouses(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  UNIQUE (product_id, warehouse_id)
);

-- Inventory change history
CREATE TABLE inventory_transactions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  warehouse_id INTEGER REFERENCES warehouses(id),
  change_amount INTEGER NOT NULL,
  reason VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers
CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255)
);

-- Product  Supplier mapping
CREATE TABLE product_suppliers (
  product_id INTEGER REFERENCES products(id),
  supplier_id INTEGER REFERENCES suppliers(id),
  PRIMARY KEY (product_id, supplier_id)
);

-- Product bundles
CREATE TABLE product_bundles (
  bundle_product_id INTEGER REFERENCES products(id),
  child_product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  PRIMARY KEY (bundle_product_id, child_product_id)
);
