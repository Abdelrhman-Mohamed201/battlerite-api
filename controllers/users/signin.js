const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Users = require("../../models/users")

signin = (req, res, next) => {
    Users.findOne({email: req.body.email}).exec()
        .then(user => {
            if (!user) {
                res.status(409).json({
                    status: 409,
                    message: 'Please check your email.',
                })
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id,
                        }, process.env.JWT_KEY, {expiresIn: "1h"})

                        return res.status(200).json({
                            status: 200,
                            message: 'Auth successful',
                            token
                        })
                    }
                    res.status(401).json({
                        status: 401,
                        message: 'Auth failed.',
                    })
                })
            }
        })
        .catch()
}

module.exports = signin