const express = require('express');
const R = require('ramda');
const passport = require('../../passport');
const encrypt = require('../../util/encrypt');

const knexConfig = require('../../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(knexConfig);

const router = express.Router();

const getSelf = (req, res, next) => {
  res.send({ user: req.user ? R.pick(['email'], req.user) : null });
  next();
  return;
};

router.get('/self', getSelf);

router.post('/sign-up', async (req, res) => {
  const errors = {};

  // validate password
  if (!req.body.password || req.body.password.length < 8) {
    errors.password = 'must be at least 8 characters long';
  }

  // validate password confirmation
  if (req.body.password !== req.body.passwordConfirmation) {
    errors.passwordConfirmation = 'does not match password';
  }

  // validate email
  const [userExists] = await knex('users').where({
    email: req.body.email
  });
  if (userExists) {
    errors.email = 'is already taken';
  }

  if (!/^.+@.+\..+$/.test(req.body.email)) {
    errors.email = 'is not a valid email address';
  }

  if (!R.isEmpty(errors)) {
    res.status(422).send({ errors });
  } else {
    await knex('users')
      .insert({
        email: req.body.email,
        password: await encrypt(req.body.password)
      })
      .returning('email');

    res.redirect('/a/sign-in');
  }
});

router.post('/sign-in', passport.authenticate('local'), getSelf);

router.post(
  '/sign-out',
  (req, res, next) => {
    req.logout();
    res.redirect('/');
    next();
    return;
  },
  getSelf
);

module.exports = router;
