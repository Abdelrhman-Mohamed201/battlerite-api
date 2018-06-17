require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    Champions.findById(req.params.championId).exec()
        .then(champion => {
            const response = {
                status: 200,
                collection: champion,
                request: {
                    type: "GET",
                    description: "Get all champions",
                    url: `${process.env.URL}/champions/g`
                }
            };
            res.status(response.status).json(response);
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