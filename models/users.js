const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
},{timestamps: true},{collection:'users'})

module.exports = mongoose.model('Users', usersSchema)