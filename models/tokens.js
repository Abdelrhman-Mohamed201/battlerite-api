const mongoose = require("mongoose");

const tokensSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    token: {type: String, required: true},
    state: {type: String, required: true},
    expiresIn: {type: String, required: true},
    userId: {type: String, ref: "Users", required: true},
}, {timestamps: true}, {collection: "tokens"});

module.exports = mongoose.model("Tokens", tokensSchema);