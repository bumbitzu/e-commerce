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
    const query = `SELECT name, surname, address, balance, email FROM customer WHERE id = $1`;
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
module.exports = {
  userExists,
  createUser,
  getUserByEmail,
  getUserById,
  getAuth,
};