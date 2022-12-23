const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    image: String,
}, {
    timestamps: true
});

const UserAccount = mongoose.model("UserAccount", userSchema);

module.exports = {
    UserAccount,
    userSchema,
};