const mongoose = require("mongoose");

const errorsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    url: {type: String, required: true},
    method: {type: String, required: true},
    status: {type: Number, required: true},
    name: {type: String},
    message: {type: String},
    token: {type: String, ref: "Tokens"},
}, {collection: "errors", timestamps: true, versionKey: false}); // versionKey: for remove the __v from collection

module.exports = mongoose.model("Errors", errorsSchema);