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
                    error: err,
                    status: 404,
                    kind: "User not found."
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "User deleted.",
                    type: "GET",
                    url: `${process.env.URL}/users/g`,
                })
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