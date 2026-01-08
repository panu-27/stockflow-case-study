# Part 3: Low Stock Alerts API

## Overview
This API returns low-stock alerts for a company by checking inventory levels across multiple warehouses and including supplier details for reordering.

## Endpoint
GET /api/companies/{company_id}/alerts/low-stock

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Approach
- Fetch all warehouses for the given company  
- Retrieve inventory across those warehouses  
- Identify products below low-stock threshold  
- Check recent sales activity (last 30 days)  
- Attach supplier information  
- Return alerts with total count  

## Edge Cases Handled
- No warehouses or inventory → empty response  
- Stock above threshold → ignored  
- No recent sales → ignored  
- Missing product or supplier → handled safely  
- Server/database error → 500 response  

## Assumptions
- MongoDB is the primary database  
- Relationships use MongoDB ObjectId references  
- Recent sales = at least one sale in last 30 days  
- Low-stock threshold is product-level  
- One primary supplier per product  
- Days until stockout uses a simple average  

## Testing
Tested using MongoDB Atlas with seeded dummy data.  
Only low-stock products with recent sales were returned.
