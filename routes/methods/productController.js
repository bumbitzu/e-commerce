const db = require('./db');

async function getAllProducts(req, res)
{
  const products = await db.getAllProducts();
  res.json(products);
}

async function getProductById(req, res)
{
  const id = req.params.id;
  const product = await db.getProductById(id);
  if (!product)
  {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
}

async function getProductByCategory(req, res)
{
  const category = req.params.category;
  const products = await db.getProductByCategory(category);
  if (!products)
  {
    res.status(404).json({ message: 'Products not found' });
    return;
  }
  res.json(products);
}

async function addProduct(req, res)
{
  const product = req.body;
  const result = await db.addProduct(product);
  res.json(result);
}

async function updatePrice(req, res)
{
  const id = req.params.id;
  const price = req.body.price;
  const result = await db.updatePrice(id, price);
  res.json(result);
}

async function updateQuantity(req, res)
{
  const id = req.params.id;
  const quantity = req.body.quantity;
  const result = await db.updateQuantity(id, quantity);
  res.json(result);
}
async function updateName(req, res)
{
  const id = req.params.id;
  const name = req.body.name;
  const result = await db.updateName(id, name);
  res.json(result);
}

async function updateCategory(req, res)
{
  const id = req.params.id;
  const category = req.body.category;
  const result = await db.updateCategory(id, category);
  res.json(result);
}

async function deleteProduct(req, res)
{
  const id = req.params.id;
  const result = await db.deleteProduct(id);
  res.json(result);
}
module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  getProductByCategory,
  updatePrice,
  updateQuantity,
  updateName,
  updateCategory,
  deleteProduct,
};

