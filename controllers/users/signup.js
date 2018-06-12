const mongoose = require("mongoose");
require("dotenv").config();
const Users = require("../../models/users");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    Users.find({email: req.body.email}).exec()
        .then(user => {
            if (user.length >= 1) {
                res.status(409).json({
                    status: 409,
                    message: "This email is exist, please enter another one.",
                })
            } else {

                // Hashing the password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Not found",
                            error: err,
                        })
                    } else {
                        const user = new Users({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            role: req.body.role,
                            lastLoginAt: null,
                        });
                        user
                            .save()
                            .then(docs => {
                                const response = {
                                    status: 201,
                                    message: "Created user successfully",
                                    collection: {
                                        _id: docs._id,
                                        name: docs.name,
                                        email: docs.email,
                                        role: docs.role,
                                        createdAt: docs.createdAt,
                                        request: {
                                            type: "GET",
                                            url: `${process.env.URL}/users/g/${docs._id}`
                                        }
                                    },
                                };
                                res.status(201).json(response)
                            })
                            .catch(err => {
                                res.status(500).json({
                                    message: "Cannot create that user.",
                                    status: 500,
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Cannot find.",
                status: 500,
                error: err
            })
        })
};