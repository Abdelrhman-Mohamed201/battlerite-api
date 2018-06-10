const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgPath: {type: String, required: true},
    imgId: mongoose.Schema.Types.ObjectId,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date},
    premalink: {type: String, required: true},
    subTitle: {type: String, required: true},
    content: {type: String, required: true},
    title: {type: String, required: true},
}, {collection: "news"});

module.exports = mongoose.model("News", newsSchema);