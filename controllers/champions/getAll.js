require("dotenv").config();
const Champions = require("../../models/champions");
const handler = require("../../services/handler");

module.exports = (req, res) => {
    Champions.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                ...docs.map(champion => {
                    return {
                        collection: champion,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/champions/g/${champion._id}`
                        }
                    }
                })
            };
            res.status(response.status).json(response);
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