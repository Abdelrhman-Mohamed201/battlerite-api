require("dotenv").config();
const handler = require("../../services/handler");
const Champions = require("../../models/champions");

module.exports = (req, res) => {
    const updateOps = {updatedAt: Date.now(), ...req.body};
    if(req.body.name){
        updateOps.premalink = req.body.name.toLowerCase().replace(/\s/g, "")
    }
    Champions.update({premalink: req.params.premalink}, {$set: updateOps}).exec()
        .then(champion => {
            const reponse = {
                status: 200,
                message: "Champion updated."
            };
            res.status(reponse.status).json(reponse);
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