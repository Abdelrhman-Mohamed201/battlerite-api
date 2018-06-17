require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    const id = req.params.championId;
    const updateOps = {updatedAt: Date.now(), ...req.body};
    Champions.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                status: 200,
                message: "Champion updated.",
                request: {
                    type: "GET",
                    url: `${process.env.URL}/champions/g/${id}`
                }
            };
            res.status(reponse.status).json(reponse);
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