const Commission = require("../models/commission");
const mongoose = require("mongoose");

const getCommission = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Commission.find({ commission_id: req.params.commission_id }, { _id: 0, __v: 0 })
        .exec()
        .then(result => {
            if (result.length > 0) {
                res.status(200).json({
                    message: "Commission Retrieved",
                    success: true,
                    commission: result
                })
            } else {
                res.status(404).json({
                    message: "Commission not found!!!",
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

const addCommission = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    req.body.commission_id = new mongoose.Types.ObjectId();
    const newCommission = new Commission(req.body);
    newCommission.save()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Commission Added",
                    success: true,
                    result: result
                })
            } else {
                res.status(400).json({
                    message: "Commission addition failed.",
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

const updateCommission = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    Commission.updateOne({ commission_id: req.params.commission_id }, { $set: { commission_percentage: req.body.commission_percentage } })
        .exec()
        .then(result => {
            if (result.acknowledged) {
                res.status(200).json({
                    message: "Commission Updated.",
                    success: true,
                    result: result
                })
            } else {
                res.status(400).json({
                    message: "Commission update failed.",
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

module.exports = { getCommission, addCommission, updateCommission };