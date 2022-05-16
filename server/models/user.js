const mongoose = require("mongoose");
const crypto = require('crypto')
let Schema = mongoose.Schema

const userSchema = new Schema({
    user_id: Schema.Types.ObjectId,
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postal_code: {
        type: String,
    },
    province: {
        type: String
    },
    country: {
        type: String
    },
    user_type: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

function getHashedPassword(password) {
    return crypto
      .createHmac('sha256', process.env.SECRET)
      .update(password)
      .digest("hex");
}

userSchema.pre('save', function (next) {
    let user = this;
    if(!user.isModified('password')) next();
    user.password = getHashedPassword(user.password)
    next()
})

userSchema.methods.validatePassword = function(password) {
    return this.password === getHashedPassword(password)
}
module.exports = mongoose.model('user', userSchema);