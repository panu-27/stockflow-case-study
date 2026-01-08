# Part 1: Code Review & Debugging (Node.js / Express)

## Overview
The original product creation API had issues related to validation, data consistency, and business rules. The corrected implementation focuses on making the endpoint safe, consistent, and scalable for a multi-warehouse B2B inventory system.

---

## Issues Identified
- No request body validation
- SKU uniqueness not enforced
- Product and inventory created without a transaction
- Missing error handling
- Unsafe handling of decimal prices
- Product tightly coupled to a single warehouse

---

## Impact in Production
- API crashes on invalid input
- Duplicate SKUs causing inventory and billing issues
- Partial data creation (product without inventory)
- Incorrect pricing due to floating-point errors
- Poor scalability for multi-warehouse setups

---

## Why This Works
- Uses transactions to ensure atomic operations
- Enforces SKU uniqueness at the database level
- Keeps products warehouse-independent
- Relies on database `DECIMAL` type for accurate pricing
- Handles errors gracefully

---

## Assumptions
- SKU is unique at the database level
- Warehouse existence is enforced via foreign keys
- `initial_quantity` defaults to `0`
- Price is stored as `DECIMAL` in the database
