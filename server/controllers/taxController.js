const Tax = require("../models/tax");
const mongoose = require("mongoose");

const getTaxByProvince = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Tax.find({ province: req.params.province }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Tax Retrieved",
                    success: true,
                    tax: result
                })
            } else {
                res.status(404).json({
                    message: "Tax details not found!!!",
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

const addTaxByProvince = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    req.body.tax_id = new mongoose.Types.ObjectId();
    const newTax = new Tax(req.body);
    newTax.save()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Tax Added",
                    success: true
                })
            } else {
                res.status(400).json({
                    message: "Tax addition failed.",
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

const updateTaxByProvince = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Tax.updateOne({ province: req.params.province }, { $set: { tax_percentage: req.body.tax_percentage } })
        .exec()
        .then(result => {
            if (result.acknowledged) {
                res.status(200).json({
                    message: "Tax Updated.",
                    success: true,
                    result: result
                })
            } else {
                res.status(400).json({
                    message: "Tax update failed",
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
        });
}

module.exports = { getTaxByProvince, addTaxByProvince, updateTaxByProvince };