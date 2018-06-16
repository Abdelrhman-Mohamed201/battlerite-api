require("dotenv").config();
const handler = require("../../services/handler");
const Users = require("../../models/users");

module.exports = (req, res) => {
    Users.find().exec()
        .then(docs => {
            const response = {
                status: 200,
                count: docs.length,
                collection: docs.map(user => {
                    return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        password: user.password,
                        role: user.role,
                        request: {
                            type: "GET",
                            url: `${process.env.URL}/users/g/${user._id}`
                        }
                    }
                }),
            };
            res.status(200).json(response)
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