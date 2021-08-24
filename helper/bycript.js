const bycript = require("bcrypt");

function hashPass(pass) {
  return bycript.hashSync(pass, bycript.genSaltSync(5));
}
function checkPass(pass, dbPass) {
  return bycript.compareSync(pass, dbPass);
}

module.exports = { hashPass, checkPass };
