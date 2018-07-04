require("dotenv").config();
const axios = require("axios");
const handler = require("../../services/handler");

const playerInfo = require("../../services/battleriteAPI/statistics/player");
const champions = require("../../services/battleriteAPI/statistics/champions");

module.exports = (req, res) => {
    const filterName = Object.keys(req.query)[0];
    const query = `filter[${filterName}]=${req.query[filterName]}`;
    axios.get(`${process.env.BR_URL}/players?${query}`,
        {headers: {Authorization: `Bearer ${process.env.BR_API_KEY}`, Accept: process.env.BR_ACCEPT,}}
    )
        .then(players => {
            const response = {
                status: 200,
                count: players.data.data.length,
                collection: players.data.data.map(player => {
                    return {
                        playerInfo: {
                            id: player.id,
                            ...playerInfo(player.attributes)
                        },
                        champions: champions(player.attributes.stats)
                    }
                })
            };
            res.status(response.status).json(response);
        })
        .catch(err => {
            handler({
                req, res,
                error: err,
                status: 500,
                kind: "Can't find players."
            });
        });
};