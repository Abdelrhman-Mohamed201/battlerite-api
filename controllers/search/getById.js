require("dotenv").config();
const axios = require("axios");
const handler = require("../../services/handler");

module.exports = (req, res) => {
    axios.get(`${process.env.BR_URL}/players/${req.params.playerId}`,
        {headers: {
                Authorization: `Bearer ${process.env.BR_API_KEY}`,
                Accept: process.env.BR_ACCEPT,
            }}
    )
        .then(players => {
            const response = {
                status: 200,
                collection: players
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find that player."
            });
        });
};