require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    Champions.findById(req.params.championId).exec()
        .then(card => {
            const response = {
                status: 200,
                collection: {
                    _id: card._id,
                    author: card.author,
                    name: card.name,
                    type: card.type,
                    hp: card.hp,
                    bio: card.bio,
                    basicGuide: card.basicGuide.map(basicGuide => {
                        return {...basicGuide}
                    }),
                    masterGuide: card.masterGuide.map(masterGuide => {
                        return {...masterGuide}
                    }),
                    status: card.status.map(status => {
                        return {...status}
                    }),
                    combos: card.combos.map(combos => {
                        return {...combos}
                    }),
                    spells: card.spells.map(spells => {
                        return {...spells}
                    }),
                    battlerites: card.battlerites.map(battlerites => {
                        return {...battlerites}
                    }),
                    createdAt: card.createdAt,
                    updatedAt: card.updatedAt,
                    request: {
                        type: "GET",
                        description: "Get all champions",
                        url: `${process.env.URL}/champions/g`
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
                kind: "Can't find the champion."
            });
        });
};