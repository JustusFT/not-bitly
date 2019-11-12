const express = require("express");
const router = express.Router();

const authRouter = require("./auth");

const knexConfig = require("../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);

function isValidUrl(url) {
  return !/^https?:\/\/([a-zA-Z0-9-]+\.)+\w+(\/.*)?$/.test(url);
}

router.use("/auth", authRouter);

router.post("/url", async (req, res) => {
  // validate the url
  if (isValidUrl(req.body.url)) {
    res.status(422).send({
      url: "is not a valid"
    });
  }

  try {
    const [result] = await knex("links")
      .insert({
        original_url: req.body.url
      })
      .returning("*");
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
