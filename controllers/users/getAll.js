require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");

module.exports = (req, res) => {
    Users.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                ...docs.map(user => {
                    return {
                        collection: user,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/users/g/${user._id}`
                        }
                    }
                }),
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the users."
            });
        })
};