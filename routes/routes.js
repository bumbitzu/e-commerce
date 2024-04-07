db = require('../db/db.js');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

//USERS ----------------------------
async function register(req, res)
{
  const { name, address, email, password } = req.body;
  const exisistingUser = await db.userExists(email);
  if (exisistingUser)
  {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await db.createUser(name, address, email, hashedPassword);
  res.json(user);
}
//export module as object
module.exports = {
  register,

};