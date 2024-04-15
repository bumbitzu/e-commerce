db = require('./db');
const bcrypt = require('bcrypt');
const sanitize = require('./sanitize');
require('dotenv').config();
const saltRounds = parseInt(process.env.SALT_ROUNDS);


async function register(req, res)
{
  const { name, surname, address, email, password } = req.body;
  const exisistingUser = await db.userExists(email);
  const sanitizedName = sanitize.name(name);
  const sanitizedSurname = sanitize.name(surname);
  if (!sanitize.email(email))
  {
    res.status(400).json({ message: 'Invalid email' });
    return;
  }

  if (!sanitize.password(password))
  {
    res.status(400).json({ message: 'Password does not meet requirements'});
    return;
  }

  if (exisistingUser)
  {
    res.status(400).json({ message: 'User already exists' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await db.createUser(sanitizedName, sanitizedSurname, address, email, hashedPassword);
  res.json(user);
}
module.exports = {
  register
};