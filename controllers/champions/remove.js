require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    Champions.remove({premalink: req.params.premalink}).exec()
        .then(champion => {
            if (!champion.n) {
                handler({
                    req, res,
                    status: 404,
                    message: "Champion not found."
                });
            } else {
                const reponse = {
                    status: 200,
                    message: "Champion deleted."
                };
                res.status(reponse.status).json(reponse);
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                message: "Can't find the champion."
            });
        })
};