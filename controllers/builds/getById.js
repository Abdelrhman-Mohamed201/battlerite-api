require("dotenv").config();
const handler = require("../../services/handler");
const Builds = require("../../models/builds");

module.exports = (req, res) => {
    Builds.findById(req.params.buildId).exec()
        .then(build => {
            const response = {
                status: 200,
                collection: build,
                request: {
                    type: "GET",
                    description: "Get all builds",
                    url: `${process.env.URL}/builds/g`
                }
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the build."
            });
        });
};