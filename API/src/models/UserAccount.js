const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    address: {
        type: String,
    },
    address_number: {
        type: String,
    },
    complement: {
        type: String,
    },
    district: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
}, {
    timestamps: true
});

const UserAccount = mongoose.model("UserAccount", userSchema);

module.exports = {
    UserAccount,
    userSchema,
};