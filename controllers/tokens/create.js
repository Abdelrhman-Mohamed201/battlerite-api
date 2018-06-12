const mongoose = require("mongoose");
const Tokens = require("../../models/tokens");
const handler = require("../../services/handler");

module.exports = ({req, res, userId, token, expiresIn}) => {
    const newToken = new Tokens({
        _id: mongoose.Types.ObjectId(),
        token, userId, expiresIn,
        state: "live"
    });

    newToken.save()
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Save token."
            });
        });
};