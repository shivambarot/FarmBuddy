const Cart = require("../models/cart");
const mongoose = require("mongoose");

const getUserCart = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Cart.find({ user_id: req.params.user_id }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Cart items retrieved",
                    success: true,
                    cartList: result
                })
            } else {
                res.status(404).json({
                    message: "No items in cart",
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
}

const getCart = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Cart.find({ cart_id: req.params.cart_id }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Cart retrieved",
                    success: true,
                    cartList: result
                })
            } else {
                res.status(404).json({
                    message: "No items in cart",
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
}

const addUserCart = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    req.body.cart_id = new mongoose.Types.ObjectId();
    req.body.cart_amount = (req.body.price * req.body.quantity).toPrecision(4)
    const newCart = new Cart(req.body);
    newCart.save()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Added to cart",
                    success: true
                })
            } else {
                res.status(400).json({
                    message: "Not added to cart",
                    success: false,
                    error: result
                })
            }
        })
        .catch(err => {
            return res.status(500).json({
                message: "Internal Server Error!!!",
                success: false,
                error: err.message
            })
        });
}

const updateCart = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const updateFields = {};
    if (req.body.product_id) {
        updateFields.product_id = req.body.product_id
    }
    if (req.body.quantity) {
        updateFields.quantity = req.body.quantity
    }
    if (updateFields !== {}) {
        Cart.updateOne({ cart_id: req.params.cart_id }, { $set: updateFields })
            .exec()
            .then(result => {
                if (result.acknowledged) {
                    res.status(200).json({
                        message: "Cart Updated.",
                        success: true,
                        result: result
                    })
                } else {
                    res.status(400).json({
                        message: "Cart update failed",
                        success: false,
                        result: result
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
    } else {
        res.status(400).json({
            message: "Invalid Body Data",
            success: false
        })
    }
}

const deleteCart = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Cart.remove({ cart_id: req.params.cart_id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "Cart item deleted.",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Cart not found",
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
        });
}

const deleteCartByProduct = async (req, res) => {
    Cart.remove({ user_id: req.headers.user_id,  product_id: req.params.product_id})
      .exec()
      .then(result => {
          if (result.deletedCount > 0) {
              res.status(200).json({
                  message: "Cart item deleted.",
                  success: true
              })
          } else {
              res.status(404).json({
                  message: "Cart not found",
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
      });
}

module.exports = { getUserCart, getCart, addUserCart, updateCart, deleteCart, deleteCartByProduct };