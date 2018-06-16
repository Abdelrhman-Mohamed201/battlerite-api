require("dotenv").config();
const Builds = require("../../models/builds");
const handler = require("../../services/handler");

module.exports = (req, res) => {
    Builds.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(build => {
                    return {
                        _id: build._id,
                        author: build.author,
                        name: build.name,
                        description: build.description,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/builds/g/${build._id}`
                        }
                    }
                }),
            };
            res.status(200).json(response)
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the builds."
            });
        });
};