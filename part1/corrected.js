app.post('/api/products', async (req, res) => {
  const {
    name,
    sku,
    price,
    warehouse_id,
    initial_quantity = 0
  } = req.body;

  // Validate required fields
  if (!name || !sku || price === undefined || !warehouse_id) {
    return res.status(400).json({
      error: 'name, sku, price and warehouse_id are required'
    });
  }

  const client = await db.connect();

  try {
    await client.query('BEGIN');

    // Create product (warehouse-independent)
    const productResult = await client.query(
      `INSERT INTO products (name, sku, price)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, sku, price]
    );

    const productId = productResult.rows[0].id;

    // Create inventory entry
    await client.query(
      `INSERT INTO inventory (product_id, warehouse_id, quantity)
       VALUES ($1, $2, $3)`,
      [productId, warehouse_id, initial_quantity]
    );

    await client.query('COMMIT');

    return res.status(201).json({
      message: 'Product created successfully',
      product_id: productId
    });

  } catch (error) {
    await client.query('ROLLBACK');

    if (error.code === '23505') { // unique violation
      return res.status(409).json({
        error: 'SKU already exists'
      });
    }

    return res.status(500).json({
      error: 'Internal server error'
    });
  } finally {
    client.release();
  }
});
