# Part 2 – Database Design

## Overview
This database schema is designed to support a multi-tenant B2B inventory management system where companies can manage products across multiple warehouses and suppliers.

---

## Design Decisions

### Products and Warehouses
Products are stored independently from warehouses. Inventory is tracked using a separate `inventory` table, allowing the same product to exist in multiple warehouses with different quantities.

---

### Inventory Tracking
An `inventory_transactions` table is used to track all inventory changes such as sales, restocking, and returns. This provides auditability and enables analytics like sales trends.

---

### Supplier Management
Products and suppliers have a many-to-many relationship, handled via the `product_suppliers` table. This allows flexibility in sourcing products.

---

### Product Bundles
Bundles are modeled using a self-referencing `product_bundles` table, allowing a product to consist of multiple other products.

---

## Indexes and Constraints

- Unique constraint on `sku` to enforce business rules.
- Composite unique constraint on `(product_id, warehouse_id)` to prevent duplicate inventory rows.
- Foreign key constraints to ensure referential integrity.

---

## Missing Requirements / Open Questions

- Is SKU unique globally or per company?
- Can a product have multiple suppliers?
- How is recent sales activity defined?
- Should low-stock thresholds vary by warehouse?
- Are nested bundles allowed?

---

## Assumptions

- SKU is globally unique.
- Inventory quantity cannot be negative.
- One product can have multiple suppliers.
- Bundles are treated as products.
