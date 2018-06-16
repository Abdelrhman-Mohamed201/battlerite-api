const mongoose = require("mongoose");
require("dotenv").config();
const handler = require("../../services/handler");

const Builds = require("../../models/builds");
const Tokens = require("../../models/tokens");
const Cards = require("../../models/cards");

module.exports = (req, res) => {
    Tokens.findOne(req.body.token).exec()
        .then(token => {
            const build = new Builds({
                _id: mongoose.Types.ObjectId(),
                author: token.userId,
                name: req.body.name,
                description: req.body.description,
            });
            build
                .save()
                .then(docs => {

                    /* Saving the cards */
                    const cards = req.body.cards.map(card => {
                        return {
                            name: card.name,
                            description: card.description,
                            type: card.type,
                            keyword: card.keyword,
                            buildId: docs._id,
                        }
                    });
                    Cards.insertMany(cards)
                        .catch(err => {
                            handler({
                                req, res,
                                error: err,
                                status: 500,
                                kind: "Can't save the cards."
                            });
                        });
                    /* End:Saving the cards */

                    const response = {
                        status: 201,
                        message: "Created build successfully.",
                        collection: {
                            _id: docs._id,
                            author: docs.author,
                            name: docs.name,
                            description: docs.description,
                            cards,
                            request: {
                                type: "GET",
                                url: `${process.env.URL}/builds/g/${docs._id}`
                            }
                        },
                    };
                    res.status(201).json(response)
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