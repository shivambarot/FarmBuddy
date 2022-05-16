const jwt = require("jsonwebtoken");

module.exports = {
  signJWT: (email) => {
    return jwt.sign({email: email}, process.env.SECRET);
  },

  verifyJWT: (token) => {
    return jwt.verify(token, process.env.SECRET)
  }
}
