const Tokens = require("../../models/tokens");
const handler = require("../../services/handler");

module.exports = ({req, res, tokenPassed}) => {
    const token = tokenPassed ? tokenPassed : req.headers.authorization.split(" ")[1];
    const updateOps = {
        updatedAt: Date.now(),
        state: "dead",
    };
    Tokens.findOne({token}).exec()
        .then(data => {
            if (data === null) {
                return handler({
                    req, res,
                    status: 404,
                    kind: "Check your token."
                });
            }
            else if (data.state === "dead") {
                return handler({
                    req, res,
                    status: 400,
                    users: data.users,
                    kind: "Logged out already."
                });
            }
            Tokens.update({token}, {$set: updateOps})
                .exec()
                .then(docs => {
                    const response = {
                        status: 200,
                        message: "Logged out.",
                    };
                    return res.status(response.status).json(response);
                })
                .catch(err => {
                    handler({
                        req, res,
                        error: err,
                        status: 500,
                        kind: "Can't update the token."
                    });
                });

        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find the token."
            });
        });
};