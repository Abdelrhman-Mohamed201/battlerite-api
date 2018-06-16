const mongoose = require("mongoose");
const Errors = require("../models/errors");

module.exports = ({req, res, status, kind, error}) => {
    const logError = new Errors({
        _id: mongoose.Types.ObjectId(),
        url: req.originalUrl,
        method: req.method,
        status: status,
        name: error ? error.name : null,
        message: error ? error.message : null,
        token: req.headers.authorization ? req.headers.authorization.split(" ")[1] : null,
    });
    logError.save()
        .then(docs => {
            return res.status(docs.status).json({
                status: docs.status,
                kind: kind,
                ...error
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: "Can't save the log error.",
                status: 500,
                error: err
            })
        })
};
