const mongoose = require("mongoose");

const cardsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    /*imgPath: {type: String, required: true},
    imgId: mongoose.Schema.Types.ObjectId,*/
    name: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    keyword: {type: String, required: true},
    buildId: {type: mongoose.Schema.Types.ObjectId, ref: 'Builds', required: true},
}, {timestamps: true}, {collection: "cards"});

module.exports = mongoose.model("Cards", cardsSchema);