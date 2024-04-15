const db = require('./db');
const bcrypt = require('bcrypt');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function getUserById(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const user = req.user;
  const id = req.user.id;
  const {rows} = await db.getUserById(id);
  res.json(rows[0]);

}
async function updateName(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const name = req.body.name;
  const response = await db.updateUserName(id, name);
  res.json(response);

}
async function updateEmail(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const email = req.body.email;
  const response = await db.updateUserEmail(id, email);
  res.json(response);

}

async function updatePassword(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const password = req.body.password;
  const rePassword = req.body.rePassword;
  if (password !== rePassword)
  {
    res.json({ message: 'Passwords do not match' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const response = await db.updateUserPassword(id, hashedPassword);
  res.json(response);

}

async function deleteUser(req, res)
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  const id = req.user.id;
  const response = await db.deleteUser(id);
  res.json(response);

}

module.exports = {
  getUserById,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
};