require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");

module.exports = (req, res) => {
    const id = req.params.userId;
    const updateOps = {updatedAt: Date.now(), ...req.body};
    Users.update({_id: id}, {$set: updateOps}).exec()
        .then(docs => {
            const reponse = {
                status: 200,
                message: "User updated.",
                request: {
                    type: "GET",
                    url: `${process.env.URL}/users/g`
                }
            };
            res.status(reponse.status).json(reponse);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the user."
            });
        });
};