require("dotenv").config();
const Champions = require("../../models/champions");
const handler = require("../../services/handler");

module.exports = (req, res) => {
    Champions.find().exec()
        .then(champions => {
            const response = {
                status: 200,
                count: champions.length,
                collection: champions.map(champion => champion)
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                message: "Can't find the champions."
            });
        });
};