require("dotenv").config();
const handler = require("../../services/handler");
const Builds = require("../../models/builds");

module.exports = (req, res) => {
    Builds.remove({_id: req.params.buildId}).exec()
        .then(docs => {
            const request = {
                type: "GET",
                url: `${process.env.URL}/builds/g`,
            };
            if (!docs.n) {
                res.status(404).json({
                    status: 404,
                    message: "Build not found.",
                    request,
                })
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Build deleted.",
                    request,
                })
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the build."
            });
        })
};