require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

async function userExists(email)
{
  try
  {
  
    const query = `SELECT email FROM customer WHERE email = $1`;
    const values = [ email ];
    
    const result = await pool.query(query, values);
    return result.rows.length > 0;
  }
  catch (error)
  {
    console.log(`userExists error: ${error}`);
  }

}
async function createUser(name, surname, address, email, password)
{
  try
  {
    const query = `INSERT INTO customer (name, surname, address, email, password_hash) VALUES ($1, $2, $3, $4, $5)`;
    const values = [ name, surname, address, email, password ];

    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'User created successfully', code: 200 };
    }
    else
    {
      return { message: 'Error creating user', code: 400};
    }
  }
  catch (error)
  {
    console.log(`"createUser" - ${error}`);
  }
  

}
async function getUserByEmail(email)
{
  try
  {
    // select form customer email and password_hash where email = $1

    const query = `SELECT id, name, surname, address, balance FROM customer WHERE email = $1`;
    const values = [ email ];

    const result = await pool.query(query, values);
    return result.rows[ 0 ];
  }
  catch (error)
  {
    console.log(`"getUser": ${error}`);
  }
}
async function getUserById(id)
{
  try
  {
    const query = `SELECT id, name, surname, address, balance, email FROM customer WHERE id = $1`;
    const values = [ id ];

    const result = await pool.query(query, values);
    return result;
  }
  catch (error)
  {
    console.log(`"getUserById": ${error}`);
  }
}
async function getAuth(email)
{
  try
  {

    const query = `SELECT id, password_hash FROM customer WHERE email = $1`;
    const values = [ email ];
    const result = await pool.query(query, values);
    return result.rows[ 0 ];
    
  }
  catch (error)
  {
    console.log(`"getAuth": ${error}`);
  }
}
async function getAllProducts()
{
  try
  {
    const query = `SELECT * FROM product`;
    const result = await pool.query(query);
    return result.rows;
  }
  catch (error)
  {
    console.log(`"getAllProducts": ${error}`);
  }
}

async function getProductById(id)
{
  try
  {
    const query = `SELECT * FROM product WHERE id = $1`;
    const values = [ id ];
    const result = await pool.query(query, values);
    return result.rows[ 0 ];
  }
  catch (error)
  {
    console.log(`"getProductById": ${error}`);
  }
}

async function getProductByCategory(category)
{
  try
  {
    const query = `SELECT * FROM product WHERE category = $1`;
    const values = [ category ];
    const result = await pool.query(query, values);
    return result.rows;
  }
  catch (error)
  {
    console.log(`"getProductByCategory": ${error}`);
  }
}

async function addProduct(product)
{
  try
  {
    const query = `INSERT INTO product (name, price, stock_quantity, category) VALUES ($1, $2, $3, $4)`;
    const values = [ product.name, product.price, product.quantity, product.category ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Product added successfully', code: 200 };
    }
    else
    {
      return { message: 'Error adding product', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"addProduct": ${error}`);
  }
}

async function updatePrice(id, price)
{
  try
  {
    const query = `UPDATE product SET price = $1 WHERE id = $2`;
    const values = [ price, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Price updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating price', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updatePrice": ${error}`);
  }
}

async function updateQuantity(id, quantity)
{
  try
  {
    const query = `UPDATE product SET stock_quantity = $1 WHERE id = $2`;
    const values = [ quantity, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Quantity updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating quantity', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateQuantity": ${error}`);
  }
}

async function updateName(id, name)
{
  try
  {
    const query = `UPDATE product SET name = $1 WHERE id = $2`;
    const values = [ name, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Name updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating name', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateName": ${error}`);
  }
}

async function updateCategory(id, category)
{
  try
  {
    const query = `UPDATE product SET category = $1 WHERE id = $2`;
    const values = [ category, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Category updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating category', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateCategory": ${error}`);
  }
}

async function deleteProduct(id)
{
  try
  {
    const query = `DELETE FROM product WHERE id = $1`;
    const values = [ id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Product deleted successfully', code: 200 };
    }
    else
    {
      return { message: 'Error deleting product', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"deleteProduct": ${error}`);
  }
}
async function updateUserName(id, name)
{
  try
  {
    const query = `UPDATE customer SET name = $1 WHERE id = $2`;
    const values = [ name, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Name updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating name', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateUserName": ${error}`);
  }
}
async function updateUserEmail(id, email)
{
  try
  {
    const query = `UPDATE customer SET email = $1 WHERE id = $2`;
    const values = [ email, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Email updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating email', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateUserEmail": ${error}`);
  }
}

async function updateUserPassword(id, password)
{
  try
  {
    const query = `UPDATE customer SET password_hash = $1 WHERE id = $2`;
    const values = [ password, id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Password updated successfully', code: 200 };
    }
    else
    {
      return { message: 'Error updating password', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"updateUserPassword": ${error}`);
  }
}

async function deleteUser(id)
{
  try
  {
    const query = `DELETE FROM customer WHERE id = $1`;
    const values = [ id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'User deleted successfully', code: 200 };
    }
    else
    {
      return { message: 'Error deleting user', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"deleteUser": ${error}`);
  }
}

async function getCart(id)
{
  try
  {
    const query = `SELECT * FROM cart WHERE customer_id = $1`;
    const values = [ id ];
    const result = await pool.query(query, values);
    return result.rows;
  }
  catch (error)
  {
    console.log(`"getCart": ${error}`);
  }
}

async function addToCart(id, product_id, quantity)
{
  try
  {
    const query = `INSERT INTO cart (customer_id, product_id, quantity) VALUES ($1, $2, $3)`;
    const values = [ id, product_id, quantity ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Added to cart successfully', code: 200 };
    }
    else
    {
      return { message: 'Error adding to cart', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"addToCart": ${error}`);
  }
}

async function deleteCartItem(customer_id, product_id)
{
  try
  {
    const query = `DELETE FROM cart WHERE product_id = $1 AND customer_id = $2`;
    const values = [ product_id, customer_id ];
    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'Item deleted from cart successfully', code: 200 };
    }
    else
    {
      return { message: 'Error deleting item from cart', code: 400 };
    }
  }
  catch (error)
  {
    console.log(`"deleteCartItem": ${error}`);
  }
}
module.exports = {
  userExists,
  createUser,
  getUserByEmail,
  getUserById,
  getAuth,
  getAllProducts,
  getProductById,
  addProduct,
  getProductByCategory,
  updatePrice,
  updateQuantity,
  updateName,
  updateCategory,
  deleteProduct,
  updateUserName,
  updateUserEmail,
  updateUserPassword,
  deleteUser,
  getCart,
  addToCart,
  deleteCartItem,
};