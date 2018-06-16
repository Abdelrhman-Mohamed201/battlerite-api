require("dotenv").config();
const handler = require("../../services/handler");
const Builds = require("../../models/builds");

module.exports = (req, res) => {
    Builds.findById(req.params.buildId).exec()
        .then(build => {
            const response = {
                status: 200,
                collection: {
                    _id: build._id,
                    author: build.author,
                    name: build.name,
                    description: build.description,
                    cards: build.map(card => {
                        return {...card}
                    }),
                    createdAt: build.createdAt,
                    updatedAt: build.updatedAt,
                    request: {
                        type: "GET",
                        description: "Get all builds",
                        url: `${process.env.URL}/builds/g`
                    }
                }
            };
            res.status(200).json(response)
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