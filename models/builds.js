const mongoose = require("mongoose");

const buildsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
}, {timestamps: true}, {collection: "builds"});

module.exports = mongoose.model("Builds", buildsSchema);