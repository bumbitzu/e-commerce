const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('./routes/methods/db');
module.exports = function (passport)
{
  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) =>
    {
      const user = await db.getAuth(email);
      if (!user)
      {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const match = await bcrypt.compare(password, user.password_hash);
      if (!match)
      {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    }
  ));

  passport.serializeUser((user, done) =>
  {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) =>
  {
    try
    {
      const { rows } = await db.getUserById(id);
      if (rows.length > 0)
      {
        done(null, rows[ 0 ]);
      } else
      {
        done(new Error('User not found'));
      }
    } catch (error)
    {
      done(error);
    }
  });
};
