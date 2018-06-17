const mongoose = require("mongoose");
require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");
const bcrypt = require("bcrypt");

module.exports = (req, res) => {
    Users.find({email: req.body.email}).exec()
        .then(user => {
            if (user.length >= 1) {
                handler({
                    req, res,
                    status: 409,
                    kind: "This email is exist, please enter another one."
                });
            } else {

                // Hashing the password
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        handler({
                            req, res,
                            error: err,
                            status: 500,
                            kind: "Error on your password."
                        });
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
                                    message: "Created user successfully.",
                                    collection: docs,
                                    request: {
                                        type: "GET",
                                        url: `${process.env.URL}/users/g/${docs._id}`
                                    }
                                };
                                res.status(response.status).json(response)
                            })
                            .catch(err => {
                                handler({
                                    req, res,
                                    error: err,
                                    status: 500,
                                    kind: "Can't create that user."
                                });
                            })
                    }
                })
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't access users."
            });
        })
};