require("dotenv").config();
const handler = require("../../services/handler");
const Builds = require("../../models/builds");
const Cards = require("../../models/cards");

module.exports = (req, res) => {
    Builds.findById(req.params.buildId).exec()
        .then(build => {
            Cards.find().where("buildId", req.params.buildId).exec()
                .then(cards => {
                    const response = {
                        status: 200,
                        collection: {
                            _id: build._id,
                            author: build.author,
                            name: build.name,
                            description: build.description,
                            createdAt: build.createdAt,
                            updatedAt: build.updatedAt,
                            cards: cards.map(card => {
                                return {
                                    _id: card._id,
                                    name: card.name,
                                    description: card.description,
                                    type: card.type,
                                    keyword: card.keyword,
                                    createdAt: card.createdAt,
                                    updatedAt: card.updatedAt,
                                }
                            }),
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
                        kind: "Can't find the cards."
                    });
                });
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