require("dotenv").config();
const axios = require("axios");
const handler = require("../../services/handler");
const Team = require("../../services/battleriteAPI/statistics/teamClass");

module.exports = (req, res) => {
    let query = [];
    Object.keys(req.query).map((queryName) => {
        query.push(`tag[${queryName}]=${req.query[queryName]}`);
    });
    query = query.toString().replace(",", "&");

    axios.get(`${process.env.BR_URL}/teams?${query}`, {headers: {Authorization: `Bearer ${process.env.BR_API_KEY}`, Accept: process.env.BR_ACCEPT}}
    )
        .then(teams => {
            const response = {
                status: 200,
                count: teams.data.data.length,
                collection: teams.data.data.map(team => {
                    return {
                        teamInfo: {
                            id: team.id,
                            ...new Team(team.attributes)
                        },
                        members: team.attributes.stats.members
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
                kind: "Can't find the teams."
            });
        });
};