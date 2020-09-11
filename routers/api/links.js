const express = require('express');
const knexConfig = require('../../knexfile')[process.env.NODE_ENV];
const knex = require('knex')(knexConfig);
const Hashids = require('hashids/cjs');

const router = express.Router();

const hashids = new Hashids(process.env.HASHID_SALT);

function isValidUrl(url) {
  return !/^https?:\/\/([a-zA-Z0-9-]+\.)+\w+(\/.*)?$/.test(url);
}

function forbidUnauthenticated(req, res, next) {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }
  next();
}

async function forbidNonOwnersOfLink(req, res, next) {
  const [link] = await knex
    .select('*')
    .from('links')
    .where({
      hashid: req.params.hashid
    })
    .limit(1);

  if (link && link.user_id === req.user.id) {
    req.link = link;
    next();
    return;
  }

  res.sendStatus(403);
}

const visibleColumns = ['original_url', 'hashid', 'links.created_at'];

router.get('/', forbidUnauthenticated, async (req, res) => {
  try {
    const result = await knex
      .select([...visibleColumns, knex.raw('COUNT(visits.id) as visits')])
      .from('links')
      .leftOuterJoin('visits', 'links.id', 'visits.link_id')
      .where({
        user_id: req.user.id
      })
      .groupBy('links.id');
    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get(
  '/:hashid/visits',
  forbidUnauthenticated,
  forbidNonOwnersOfLink,
  async (req, res) => {
    const visits = await knex
      .select(['created_at'])
      .from('visits')
      .where({
        link_id: req.link.id
      })
      .orderBy('created_at');

    res.send(visits);
  }
);

router.post('/', async (req, res) => {
  // validate the url
  if (isValidUrl(req.body.url)) {
    res.status(422).send({
      url: 'URL is not valid'
    });
    return;
  }

  try {
    let links;

    await knex.transaction(async trx => {
      links = await trx('links')
        .insert({
          original_url: req.body.url,
          user_id: req.user ? req.user.id : null
        })
        .returning(['id']);
      return trx('links')
        .where({ id: links[0].id })
        .update({
          hashid: hashids.encode(links[0].id)
        });
    });

    const [result] = await knex('links')
      .where({ id: links[0].id })
      .returning(visibleColumns);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete(
  '/:hashid', 
  forbidUnauthenticated,
  forbidNonOwnersOfLink,
  async (req, res) => {
    try {
      await knex.transaction(async trx => {
        await trx('visits')
          .where({ link_id: req.link.id })
          .delete();
        await trx('links')
          .where({ id: req.link.id })
          .delete();
      });
      res.sendStatus(200);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
