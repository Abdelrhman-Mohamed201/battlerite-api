const mongoose = require("mongoose");
require("dotenv").config();
const handler = require("../../services/handler");

const Champions = require("../../models/champions");
const Tokens = require("../../models/tokens");

module.exports = (req, res) => {
    Tokens.findOne(req.body.token).exec()
        .then(token => {
            const champion = new Champions({
                _id: mongoose.Types.ObjectId(),
                author: token.userId,
                ...req.body,
                premalink: req.body.name.toLowerCase().replace(/\s/g, "")
            });
            champion
                .save()
                .then(champion => {
                    const response = {
                        status: 201,
                        message: "Created champion successfully."
                    };
                    res.status(response.status).json(response);
                })
                .catch(err => {
                    handler({
                        req, res,
                        error: err,
                        status: 500,
                        message: "Can't save the champion."
                    });
                });
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                message: "Can't find the user id."
            });
        });
};