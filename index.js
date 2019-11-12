require("dotenv").config();

const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const webpackDevMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackConfig);

const session = require("express-session");

const passport = require("./passport");
const apiRouter = require("./routers");

const knexConfig = require("./knexfile")[process.env.NODE_ENV];
const knex = require("knex")(knexConfig);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(webpackDevMiddleware(compiler));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", apiRouter);

app.get("/((sign-in)|(sign-up)|(dashboard))?", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});

app.get("/:id", async (req, res) => {
  const [link] = await knex("links")
    .where("hashid", req.params.id)
    .limit(1);
  if (link) {
    res.redirect(link.original_url);
  } else {
    res.sendStatus(404);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
