const express = require('express');
const app = express();
const route = require('./routes/routes');
const bodyParser = require('body-parser');
const session = require('express-session');
//inporting the dotenv module
require('dotenv').config();

const port = process.env.SERVER_PORT;
const root = process.env.SERVER_ROOT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    sameSite: 'Lax'
  }
}));

app.post(`${root}register`, route.register);

app.listen(port, () =>
{
  console.log(`Server is running at http://localhost:${port}`);
});
