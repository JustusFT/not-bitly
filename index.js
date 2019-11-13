require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const webpackDevMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackConfig);

const session = require("express-session");

const passport = require("./passport");
const rootRouter = require("./routers");

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

app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
