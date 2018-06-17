const mongoose = require("mongoose");

const tokensSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    state: {type: String, required: true},
    expiresIn: {type: String, required: true},
    userId: {type: String, ref: "Users", required: true},
}, {collection: "tokens", timestamps: true, versionKey: false}); // versionKey: for remove the __v from collection

module.exports = mongoose.model("Tokens", tokensSchema);