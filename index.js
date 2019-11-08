const express = require('express');
const app = express();
const port = 3000;

// TODO use node_env
const knexConfig = require('./knexfile')['development'];
const knex = require('knex')(knexConfig);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
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
