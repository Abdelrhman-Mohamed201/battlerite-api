require("dotenv").config();
const axios = require("axios");
const handler = require("../../services/handler");

const playerInfo = require("../../services/battleriteAPI/statistics/player");
const champions = require("../../services/battleriteAPI/statistics/champions");

module.exports = (req, res) => {
    axios.get(`${process.env.BR_URL}/players/${req.params.playerId}`,
        {headers: {Authorization: `Bearer ${process.env.BR_API_KEY}`, Accept: process.env.BR_ACCEPT,}}
    )
        .then(player => {
            const response = {
                status: 200,
                collection: {
                    playerInfo: {
                        id: player.data.data.id,
                        ...playerInfo(player.data.data.attributes)
                    },
                    champions: champions(player.data.data.attributes.stats)
                }
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