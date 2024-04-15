require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register } = require('./methods/registerController');
const product = require('./methods/productController');
const user = require('./methods/userController');
const cart = require('./methods/cartController');


// ================== Register Route ==================
const root = process.env.SERVER_ROOT;
// register route
router.post(`${root}register`, register);

// ================== Login Routes ==================
// login route
router.post(`${root}login`, (req, res, next) =>
{
  if (req.isAuthenticated())
  {
    res.json({ message: 'You are already logged in' });
  } else
  {
    next();
  }
}, passport.authenticate('local', {
  successRedirect: `${root}login-success`,
  failureRedirect: `${root}login-failure`,
}));

// login success route
router.get(`${root}login-success`, (req, res) =>
{
  
  if(req.isAuthenticated())
  {
    console.log(req.user.id);
    res.json({ message: 'Login successful' });
  }
});

// login failure route
router.get(`${root}login-failure`, (req, res) =>
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

//================ Product Routes =================
router.get(`${root}products`, product.getAllProducts);
router.get(`${root}products/id/:id`, product.getProductById);
router.get(`${root}products/category/:category`, product.getProductByCategory);
router.post(`${root}admin/products`, product.addProduct);
router.put(`${root}admin/products/update-price/:id`, product.updatePrice);
router.put(`${root}admin/products/update-quantity/:id`, product.updateQuantity);
router.put(`${root}admin/products/update-name/:id`, product.updateName);
router.put(`${root}admin/products/update-category/:id`, product.updateCategory);
router.delete(`${root}admin/products/delete/:id`, product.deleteProduct);

//============== User Routes ==================
router.get(`${root}user`, user.getUserById);
router.put(`${root}user/update-name/`, user.updateName);
router.put(`${root}user/update-email/`, user.updateEmail);
router.put(`${root}user/update-password/`, user.updatePassword);
router.delete(`${root}user/delete/`, user.deleteUser);

// ============== Cart Routes ===============
router.get(`${root}cart`, cart.getCart);
router.post(`${root}cart/add`, cart.addToCart);
router.delete(`${root}cart/delete/:id`, cart.deleteCartItem);
// ============== Home Routes ===============
router.get(`${root}home`, product.getAllProducts);

module.exports = router;



