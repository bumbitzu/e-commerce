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
  
    const query = `SELECT * FROM customer WHERE email = $1`;
    const values = [ email ];
    
    const result = await pool.query(query, values);
    return result.rows.length > 0;
  }
  catch (error)
  {
    console.log(`userExists error: ${error}`);
  }

}
async function createUser(name, address, email, password)
{
  try
  {
    const query = `INSERT INTO customer (name, address, email, password_hash) VALUES ($1, $2, $3, $4)`;
    const values = [ name, address, email, password ];

    const result = await pool.query(query, values);
    if (result.rowCount > 0)
    {
      return { message: 'User created', code: 200 };
    }
    else
    {
      return { message: 'User not created', code: 400};
    }
  }
  catch (error)
  {
    console.log(`createUser error: ${error}`);
  }
  

}
module.exports = {
  userExists,
  createUser,
};