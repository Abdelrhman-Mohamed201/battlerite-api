const mongoose = require("mongoose")

const newsschema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // author: '',
    // img: '',
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date},
    premalink: {type: String, required: true},
    subTitle: {type: String, required: true},
    content: {type: String, required: true},
    title: {type: String, required: true},
})

module.exports = mongoose.model('News', newsschema)