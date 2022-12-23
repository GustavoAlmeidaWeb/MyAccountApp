const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddress = new Schema({
    addressType: Number,
    addressZipcode: String,
    addressStreet: String,
    addressNumber: String,
    addressComplement: String,
    addressDistrict: String,
    addressCity: String,
    addressState: String,
    userId: mongoose.ObjectId,
},{
    timestamps: true,
})

const UserAddress = mongoose.model("UserAddress", userAddress);

module.exports = {
    UserAddress,
    userAddress,
};