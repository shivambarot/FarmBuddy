const Order = require("../models/order");
const Cart = require("../models/cart");
const mongoose = require("mongoose");

const getOrderById = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Order.find({ order_id: req.params.order_id }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Order Retrieved",
                    success: true,
                    order: result
                })
            } else {
                res.status(404).json({
                    message: "Order not found!!!",
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

const getOrderByUserId = async (req, res) => {
    Order.find({user_id: req.params.user_id}, {_id: 0, __v: 0})
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Orders Retrieved",
                    success: true,
                    order: result
                })
            } else {
                res.status(404).json({
                    message: "Order not found!!!",
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

const addOrder = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    try {
        const user = req.body.user_id;
        const commissionPercentage = req.body.commission_percentage;
        const taxPercentage = req.body.tax_percentage;
        const deliveryFee = (req.body.delivery_fee) ? req.body.delivery_fee : 0.0;
        Cart.find({ user_id: user })
            .exec()
            .then(result => {
                if (result.length > 0) {
                    const cartCount = result.length;
                    let orderAmount = 0.0;
                    for (let i = 0; i < cartCount; i++) {
                        orderAmount = orderAmount + result[i].cart_amount
                    }
                    const commissionAmount = (orderAmount * (commissionPercentage / 100)).toPrecision(3);
                    const taxAmount = (orderAmount * (taxPercentage / 100)).toPrecision(3);
                    const totalAmount = (Number(orderAmount) + Number(commissionAmount) + Number(taxAmount) + Number(deliveryFee));
                    const newOrder = new Order({
                        order_id: new mongoose.Types.ObjectId(),
                        user_id: user,
                        items: result,
                        order_amount: orderAmount,
                        commission: commissionAmount,
                        is_home_delivery: req.body.is_home_delivery,
                        tax: taxAmount,
                        delivery_fee: deliveryFee,
                        total_amount: totalAmount
                    })
                    newOrder.save()
                        .then(result2 => {
                            console.log("in save");
                            if (result2) {
                                Cart.remove({ user_id: user })
                                    .exec()
                                    .then(result3 => {
                                        if (result3.deletedCount > 0) {
                                            res.status(200).json({
                                                message: "Order Added",
                                                success: true
                                            })
                                        }
                                    })
                            } else {
                                res.status(400).json({
                                    message: "Order not added",
                                    success: true
                                })
                            }
                        })
                } else {
                    res.status(404).json({
                        message: "No items in Cart",
                        success: false
                    })
                }
            })
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error!!!",
            success: false,
            error: err.message
        })
    }
}

const deleteOrder = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Order.remove({ order_id: req.params.order_id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "Order Deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Order not found.",
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

module.exports = { getOrderById, addOrder, deleteOrder, getOrderByUserId };