const db = require('./db');

async function getCart(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const cart = await db.getCart(id);
  if (cart)
  {
    const response =
    {
      cart_products: [],
      total: 0,
    };
    for (const item of cart)
    {
      const product = await db.getProductById(item.product_id);
      response.cart_products.push(
        {
        category : product.category,
        quantity: item.quantity,
        name: product.name,
        price: product.price,
      });
      response.total += product.price * item.quantity;
    }
    res.json(response);
  }
  else
  {
    res.json({ message: 'Error getting cart', code: 400 });
  }
}

async function addToCart(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const { product_id, quantity } = req.body;
  const result = await db.addToCart(id, product_id, quantity);
  if (result)
  {
    res.json(result);
  }
  else
  {
    res.json({ message: 'Error adding to cart', code: 400 });
  }
}
async function deleteCartItem(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const product_id = parseInt(req.params.id);
  const result = await db.deleteCartItem(id, product_id);
  if (result)
  {
    res.json(result);
  }
  else
  {
    res.json({ message: 'Error deleting item from cart', code: 400 });
  }
}
module.exports = {
  getCart,
  addToCart,
  deleteCartItem,
};