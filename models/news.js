const mongoose = require("mongoose");

const newsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    imgPath: {type: String, required: true},
    imgId: mongoose.Schema.Types.ObjectId,
    premalink: {type: String, required: true},
    subTitle: {type: String, required: true},
    content: {type: String, required: true},
    title: {type: String, required: true},
}, {timestamps: true}, {collection: "news"});

module.exports = mongoose.model("News", newsSchema);