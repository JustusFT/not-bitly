require('dotenv').config();

const path = require('path');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const session = require('express-session');

const passport = require('./passport');
const rootRouter = require('./routers');

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler));
} else {
  app.use(express.static(path.join(__dirname, 'client/dist')));
}

app.use('/', rootRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
