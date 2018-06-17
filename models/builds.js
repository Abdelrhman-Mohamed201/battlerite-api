const mongoose = require("mongoose");

const buildsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    cards: {type: Array, required: true},
    versionKey: false
}, {collection: "builds", timestamps: true, versionKey: false}); // versionKey: for remove the __v from collection

module.exports = mongoose.model("Builds", buildsSchema);