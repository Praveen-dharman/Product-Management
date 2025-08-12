const db = require('../db');

// Get all products (with optional search)
exports.getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;
    let query = 'SELECT * FROM products';
    const params = [];

    if (search) {
      query += ' WHERE name LIKE ? OR description LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY created_at DESC';
    
    const [products] = await db.query(query, params);
    res.json(products);

  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Create new product
exports.createProduct = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Valid product name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO products (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    res.status(201).json({
      id: result.insertId,
      name,
      description: description || null
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Valid product name is required' });
    }

    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ? WHERE id = ?',
      [name, description || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ id, name, description: description || null });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};