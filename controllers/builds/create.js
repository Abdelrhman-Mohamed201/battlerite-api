const mongoose = require("mongoose");
require("dotenv").config();
const handler = require("../../services/handler");

const Builds = require("../../models/builds");
const Tokens = require("../../models/tokens");

module.exports = (req, res) => {
    Tokens.findOne(req.body.token).exec()
        .then(token => {
            const build = new Builds({
                _id: mongoose.Types.ObjectId(),
                author: token.userId,
                ...req.body
            });
            build
                .save()
                .then(docs => {
                    const response = {
                        status: 201,
                        message: "Created build successfully.",
                        collection: docs,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/builds/g/${docs._id}`
                        }
                    };
                    res.status(response.status).json(response);
                })
                .catch(err => {
                    handler({
                        req, res,
                        error: err,
                        status: 500,
                        kind: "Can't save the build."
                    });
                });
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the user id."
            });
        });
};