const mongoose = require("mongoose");

const productSchema = {
    product_id: mongoose.Schema.Types.ObjectId,
    user_id: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_description: {
        type: String
    },
    product_image: {
        type: String
    }
}

module.exports = mongoose.model('Product', productSchema);