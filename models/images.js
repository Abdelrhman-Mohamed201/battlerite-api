const mongoose = require('mongoose')

const imagesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fieldname: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    originalname: {type: String, required: true},
    encoding: {type: String, required: true},
    mimetype: {type: String, required: true},
    destination: {type: String, required: true},
    filename: {type: String, required: true},
    path: {type: String, required: true},
    size: {type: Number, required: true}
},{collection:'images'})

module.exports = mongoose.model('Images', imagesSchema)