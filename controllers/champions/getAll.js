require("dotenv").config();
const Champions = require("../../models/champions");
const handler = require("../../services/handler");

module.exports = (req, res) => {
    Champions.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(champion => {
                    return {
                        _id: docs._id,
                        author: docs.author,
                        name: docs.name,
                        type: docs.type,
                        hp: docs.hp,
                        bio: docs.bio,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/champions/g/${champion._id}`
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
                kind: "Can't find the champions."
            });
        });
};