require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    Champions.remove({_id: req.params.championId}).exec()
        .then(docs => {
            if (!docs.n) {
                handler({
                    req, res,
                    status: 404,
                    kind: "Champion not found."
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Champion deleted.",
                    type: "GET",
                    url: `${process.env.URL}/champions/g`,
                })
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the champion."
            });
        })
};