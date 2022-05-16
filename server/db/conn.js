const mongoose = require("mongoose");
const Db = process.env.ATLAS_URI;

module.exports = {
  connectToServer: function (callback) {
    mongoose.connect(Db)
        .then(() => {
          console.log("Connected to MongoDB");
        })
        .catch(err => {
          console.log("Connection Failed. Error: ", err);
        })
  },
};