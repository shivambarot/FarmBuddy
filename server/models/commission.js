const mongoose = require("mongoose");

const commissionSchema = {
    commission_id: mongoose.Schema.Types.ObjectId,
    commission_percentage: {
        type: Number,
        required: true
    }
}

module.exports = mongoose.model('Commission', commissionSchema);