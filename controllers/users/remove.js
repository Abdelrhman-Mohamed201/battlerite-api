require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");

module.exports = (req, res) => {
    const id = req.params.userId;
    Users.remove({_id: id}).exec()
        .then(docs => {
            if (!docs.n) {
                handler({
                    req, res,
                    status: 404,
                    kind: "User not found."
                });
            } else {
                const reponse = {
                    status: 200,
                    message: "User deleted.",
                    request: {
                        type: "GET",
                        url: `${process.env.URL}/users/g`
                    }
                };
                res.status(reponse.status).json(reponse);
            }
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't remove that user."
            });
        })
};