const mongoose = require("mongoose");

const cartSchema = {
    cart_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_name: {
        type: String
    },
    product_image: {
        type: String
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cart_amount: {
        type: Number
    }
}

module.exports = mongoose.model('Cart', cartSchema);