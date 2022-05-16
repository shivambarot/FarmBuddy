const mongoose = require("mongoose");

const orderSchema = {
    order_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: String,
        required: true
    },
    items: {
        type: Array
    },
    order_amount: {
        type: Number,
        required: true
    },
    commission: {
        type: Number,
        required: true
    },
    is_home_delivery: {
        type: Boolean,
        required: true,
        default: true
    },
    tax: {
        type: Number,
        required: true
    },
    delivery_fee: {
        type: Number,
        required: true,
        default: 0.0
    },
    total_amount: {
        type: Number,
    }
}

module.exports = mongoose.model('Order', orderSchema);