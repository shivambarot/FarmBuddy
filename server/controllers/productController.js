const Product = require("../models/product");
const mongoose = require("mongoose");

const getAllProducts = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    Product.find({}, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Products Retrieved",
                    success: true,
                    products: result
                })
            } else {
                res.status(404).json({
                    message: "No product available!!!",
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

const getProductByUserId = async (req, res) => {
    Product.find({user_id: req.params.user_id}, {_id: 0, __v: 0})
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Products Retrieved",
                    success: true,
                    product: result
                })
            } else {
                res.status(404).json({
                    message: "Product not found!!!",
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

const getProductById = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Product.find({ product_id: req.params.product_id }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Product Retrieved",
                    success: true,
                    product: result
                })
            } else {
                res.status(404).json({
                    message: "Product not found!!!",
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

const addProduct = async (req, res) => {
    req.body.product_id = new mongoose.Types.ObjectId();
    const newProduct = new Product(req.body);
    newProduct.save()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Product Added",
                    success: true
                })
            } else {
                res.status(400).json({
                    message: "Product addition failed.",
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

const updateProduct = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const updateFields = {};
    if (req.body.product_name) {
        updateFields.product_name = req.body.product_name
    }
    if (req.body.product_price) {
        updateFields.product_price = req.body.product_price
    }
    if (req.body.product_description) {
        updateFields.product_description = req.body.product_description
    }
    if (req.body.product_image) {
        updateFields.product_image = req.body.product_image
    }
    if (updateFields !== {}) {
        Product.updateOne({ product_id: req.params.product_id }, { $set: updateFields })
            .exec()
            .then(result => {
                if (result.acknowledged) {
                    res.status(200).json({
                        message: "Product Updated.",
                        success: true,
                        result: result
                    })
                } else {
                    res.status(400).json({
                        message: "Product update failed",
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

const deleteProduct = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Product.remove({ product_id: req.params.product_id })
        .exec()
        .then(result => {
            if (result.deletedCount > 0) {
                res.status(200).json({
                    message: "Product Deleted",
                    success: true
                })
            } else {
                res.status(404).json({
                    message: "Product not found",
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

module.exports = { getProductById, addProduct, updateProduct, deleteProduct, getAllProducts, getProductByUserId };