const mongoose = require("mongoose");

const championsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    bio: {type: String, required: true},
    hp: {type: Number, required: true},
    name: {type: String, required: true},
    slogan: {type: String, required: true},
    type: {type: String, required: true},
    basicGuide: {type: Array},
    masterGuide: {type: Array},
    status: {type: Array},
    combos: {type: Array},
    spells: {type: Array, required: true},
    battlerites: {type: Array, required: true},
    quote: {type: Array},
}, {collection: "champions", timestamps: true, versionKey: false}); // versionKey: for remove the __v from collection

module.exports = mongoose.model("Champions", championsSchema);