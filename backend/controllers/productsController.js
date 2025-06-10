const ServicesProducts = require('../models/ServicesProducts');

async function getAllProducts(req, res) {
  try {
    const products = await ServicesProducts.findAll();
    return res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function createProduct(req, res) {
  try {
    const { name, type, description, price } = req.body;
    if (!name || !type || !price) {
      return res.status(400).json({ error: 'Name, type, and price are required' });
    }
    const newProduct = await ServicesProducts.create({ name, type, description, price });
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    const { name, type, description, price } = req.body;
    const product = await ServicesProducts.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    product.name = name || product.name;
    product.type = type || product.type;
    product.description = description || product.description;
    product.price = price || product.price;
    await product.save();
    return res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteProduct(req, res) {
  try {
    const id = req.params.id;
    const product = await ServicesProducts.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    await product.destroy();
    return res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
