const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = function(string) {
  return bcrypt.hash(string, saltRounds);
};
