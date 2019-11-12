const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const knexConfig = require("./knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);

passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const [user] = await knex
        .select("id", "email", "password")
        .from("users")
        .where({ email })
        .limit(1);
      // invalid email
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return cb(null, false);
      }
      // success
      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const [user] = await knex
      .select("email")
      .from("users")
      .where({ id })
      .limit(1);
    cb(null, user);
  } catch (err) {
    return cb(err);
  }
});

module.exports = passport;
