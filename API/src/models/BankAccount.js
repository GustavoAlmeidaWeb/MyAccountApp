const mongoose = require('mongoose');
const { Schema } = mongoose;

const bankSchema = new Schema({
    bankName: String,
    bankAgency: String,
    bankAccount: String,
    bankPix: String,
    userId: mongoose.ObjectId,
},{
    timestamps: true,
})

const BankAccount = mongoose.model("BankAccount", bankSchema);

module.exports = {
    BankAccount,
    bankSchema,
};