const userService = require("../services/user")
const authService = require("../services/auth")
const User = require("../models/user");
const mongoose = require("mongoose");


module.exports = {
  login: async (req, res) => {
    let userCredentials = req.body;
    userService.getUserByEmail(userCredentials.email).then(result => {
      if (result === null) return res.status(404).json({msg: "User is not present"})
      const user = result.toObject();
      if(!result.validatePassword(req.body.password)) return res.status(401).json({msg: "Invalid password"})
      const token = authService.signJWT(userCredentials.email);
      res.json({
        access_token: token,
        user: {
          name: user.name,
          user_type: user.user_type,
          user_id: user.user_id
        }
      })
    }).catch(err => {
      res.status(500).json({msg: "please try again"})
    })
  },

  getUserById : async (req, res) => {
    User.find({user_id: req.params.user_id}, {_id: 0, __v: 0})
      .exec()
      .then(result => {
        if (result.length > 0) {
          res.status(200).json({
            message: "User Retrieved",
            success: true,
            user: result
          })
        } else {
          res.status(404).json({
            message: "User not found!!!",
            success: false
          })
        }
      })
      .catch(err => {
        return res.status(500).json({
          message: "Internal Server Error!!!",
          success: false,
          error: err.message
        })
      })
  },

  addUser: async (req, res) => {
    userService.getUserByEmail(req.body.email).then(result => {
      if(result !== null) return res.status(412).json({msg: "User already exists"});
      req.body.user_id = new mongoose.Types.ObjectId();
      const newUser = new User(req.body);
      newUser.save().then(result => {
        const token = authService.signJWT(req.body.email);
        res.status(200).json({
          message: "User Added",
          access_token: token,
          user_type: req.body.user_type,
          user_id: req.body.user_id,
          success: true
        })
      }).catch(err => {
        return res.status(500).json({
          message: "Internal Server Error!!!",
          success: false,
          error: err.message
        })
      })
    })
  }
};