require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");

module.exports = (req, res) => {
    Users.findById(req.params.userId).exec()
        .then(docs => {
            const response = {
                status: 200,
                collection: docs,
                request: {
                    type: "GET",
                    description: "Get all users",
                    url: `${process.env.URL}/users/g`
                }
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the user."
            });
        })
};