const encrypt = require("../util/encrypt");
const moment = require("moment");

function randomWithinLastWeek() {
  return moment()
    .subtract(Math.floor(Math.random() * 7), "days")
    .format();
}

exports.seed = async function(knex) {
  await knex("visits").del();
  await knex("links").del();
  await knex("users").del();

  await knex("users").insert([
    { id: 1, email: "test@test.com", password: await encrypt("password") }
  ]);

  await knex("links").insert([
    { id: 1, user_id: 1, original_url: "https://example1.com" },
    { id: 2, user_id: 1, original_url: "https://example2.com" },
    { id: 3, user_id: 1, original_url: "https://example3.com" }
  ]);

  await knex("visits").insert([
    ...Array(100)
      .fill()
      .map(() => ({ link_id: 1, created_at: randomWithinLastWeek() })),
    ...Array(100)
      .fill()
      .map(() => ({ link_id: 2, created_at: randomWithinLastWeek() })),
    ...Array(100)
      .fill()
      .map(() => ({ link_id: 3, created_at: randomWithinLastWeek() }))
  ]);
  return;
};
