const mongoose = require("mongoose");

const taxSchema = {
    tax_id: mongoose.Schema.Types.ObjectId,
    province: {
        type: String,
        required: true
    },
    tax_percentage: {
        type: Number,
        required: true
    }
}

module.exports = mongoose.model('Tax', taxSchema);