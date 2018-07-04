require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    Champions.findOne({premalink:req.params.premalink}).exec()
        .then(champion => {
            const response = {
                status: 200,
                collection: champion
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                message: "Can't find the champion."
            });
        });
};