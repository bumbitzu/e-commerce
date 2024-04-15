const express = require('express');
const session = require('express-session');
const passport = require('passport');
const routes = require('./routes/routes');
const initializePassport = require('./passportConfig');


require('dotenv').config();

const app = express();

const port = process.env.SERVER_PORT;
const secret = process.env.SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);


app.listen(port, () =>
{
  console.log(`Server running on http://localhost:${port}`);
});
