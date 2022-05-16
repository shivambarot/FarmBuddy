const User = require("../models/user");

module.exports = {
  getUserByEmail: (email) => {
    return User.findOne({email: email}).exec();
  }
}
