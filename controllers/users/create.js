const mongoose = require("mongoose")
require('dotenv').config()
const Users = require("../../models/users")

create = (req, res, next) => {
    const user = new Users({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
    })

    user
        .save()
        .then(docs => {
            const response = {
                status: 201,
                message: 'Created user successfully',
                collection: {
                    _id: docs._id,
                    name: docs.name,
                    email: docs.email,
                    password: docs.password,
                    role: docs.role,
                    createdAt: docs.createdAt,
                    updatedAt: docs.updatedAt,
                    request: {
                        type: 'GET',
                        url: `${process.env.URL}/users/g/${docs._id}`
                    }
                },
            }
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                error: err
            })
        })
}

module.exports = create