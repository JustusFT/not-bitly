const express = require("express");
const path = require("path");
const knexConfig = require("../knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);
const apiRouter = require("./api");

const router = express.Router();

router.use("/api", apiRouter);

router.get("/((sign-in)|(sign-up)|(dashboard))?", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

router.get("/:id", async (req, res) => {
  const [link] = await knex("links")
    .where("hashid", req.params.id)
    .limit(1);
  if (link) {
    // insert a new visit
    await knex("visits")
      .insert({
        link_id: link.id
      })
      .returning("*");

    res.redirect(link.original_url);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
