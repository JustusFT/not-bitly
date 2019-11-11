require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000;

const knexConfig = require('./knexfile')[process.env.NODE_ENV];
const knex = require('knex')(knexConfig);

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig);

app.use(middleware(compiler));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send();
});

app.post('/url', async (req, res) => {
  // validate the url
  if (!/^https?:\/\/([a-zA-Z0-9-]+\.)+\w+(\/.*)?$/.test(req.body.url)) {
    res.status(422).send({
      url: 'is not a valid'
    });
  }

  try {
    const [result] = await knex('links')
      .insert({
        original_url: req.body.url
      })
      .returning('*');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/:id', async (req, res) => {
  const [link] = await knex('links')
    .where('hashid', req.params.id)
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
