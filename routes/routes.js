const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register } = require('./methods/register');
require('dotenv').config();

const root = process.env.SERVER_ROOT;
// register route
router.post(`${root}register`, register);

// login route
router.post(`${root}login`, passport.authenticate('local', {
  successRedirect: `${root}login-success`,
  failureRedirect: `${root}login-failure`,
}));

// login success route
router.get(`${root}login-success`, (req, res) =>
{
  if(req.isAuthenticated())
  {
    res.json({ message: 'Login successful' });
  }
});

// login failure route
router.get(`${root}ogin-failure`, (req, res) =>
{
  res.json({ message: 'Login failed' });
});

router.get(`${root}logout`, (req, res) =>
{
  if (!req.isAuthenticated())
  {
    res.json({ message: 'You are not logged in' });
    return;
  }
  req.logout((err) =>
  {
    if (err)
    {
      return next(err);
    }
    // Redirect to login page after logout
    res.json({ message: 'Logout successful' });
  });
});
module.exports = router;