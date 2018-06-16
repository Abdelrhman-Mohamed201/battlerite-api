const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");
const createToken = require("../tokens/create");
const autoExpireToken = require("../../services/autoExpireToken");

module.exports = (req, res) => {
    Users.findOne({email: req.body.email}).exec()
        .then(user => {
            if (!user) {
                handler({
                    req, res,
                    status: 409,
                    kind: "Please check your email."
                });
            } else {
                Users.update({_id: user._id}, {$set: {lastLoginAt: Date.now()}}).exec();

                const userData = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };

                // Checking the password
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        const expiresIn = process.env.EXPIRES_IN;

                        // Generate a token
                        const token = jwt.sign({userData},
                            process.env.JWT_KEY, {expiresIn});

                        createToken({req, res, userId: user._id, token, expiresIn});

                        autoExpireToken({req, token, expiresIn});

                        return res.status(200).json({
                            status: 200,
                            message: "Auth successful",
                            user: {
                                ...userData,
                                expiresIn,
                                token,
                            }
                        })
                    }
                    handler({
                        req, res,
                        error: err,
                        status: 401,
                        kind: "Auth failed."
                    });
                })
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the user."
            });
        })
};