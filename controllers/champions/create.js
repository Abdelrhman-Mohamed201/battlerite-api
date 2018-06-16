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
            });
            champion
                .save()
                .then(docs => {
                    const response = {
                        status: 201,
                        message: "Created champion successfully.",
                        collection: {
                            _id: docs._id,
                            author: docs.author,
                            name: docs.name,
                            type: docs.type,
                            hp: docs.hp,
                            bio: docs.bio,
                            basicGuide: docs.basicGuide.map(basicGuide => {
                                return {...basicGuide}
                            }),
                            masterGuide: docs.masterGuide.map(masterGuide => {
                                return {...masterGuide}
                            }),
                            status: docs.status.map(status => {
                                return {...status}
                            }),
                            combos: docs.combos.map(combos => {
                                return {...combos}
                            }),
                            spells: docs.spells.map(spells => {
                                return {...spells}
                            }),
                            battlerites: docs.battlerites.map(battlerites => {
                                return {...battlerites}
                            }),
                            createdAt: docs.createdAt,
                            updatedAt: docs.updatedAt,
                            request: {
                                type: "GET",
                                url: `${process.env.URL}/champions/g/${docs._id}`
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
                        kind: "Can't save the champion."
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