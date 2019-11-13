const express = require("express");
const R = require("ramda");
const passport = require("../../passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const knexConfig = require("../../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);

const router = express.Router();

router.get("/self", (req, res) => {
  res.send({ user: req.user ? R.pick(["email"], req.user) : null });
});

router.post("/sign-up", async (req, res) => {
  // validate password
  if (!req.body.password || req.body.password.length < 8) {
    res.status(422).send({ error: "password must be 8 characters or longer" });
  }

  // validate password confirmation
  if (req.body.password !== req.body.passwordConfirmation) {
    res
      .status(422)
      .send({ error: "password confirmation does not match password" });
  }

  // validate email
  const [userExists] = await knex("users").where({
    email: req.body.email
  });
  if (userExists) {
    res.status(422).send({ error: "email is already taken" });
  }

  await knex("users")
    .insert({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds)
    })
    .returning("email");

  res.redirect("/");
});

router.post(
  "/sign-in",
  passport.authenticate("local", { failureRedirect: "/auth/sign-in" }),
  async (req, res) => {
    res.redirect("/");
  }
);

router.post("/sign-out", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
