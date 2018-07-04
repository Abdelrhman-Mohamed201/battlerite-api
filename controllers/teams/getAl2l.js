require("dotenv").config();
const axios = require("axios");
const handler = require("../../services/handler");

const Team = require("../../services/battleriteAPI/statistics/teamClass");
const playerInfo = require("../../services/battleriteAPI/statistics/player");

module.exports = (req, res) => {
    const headers = {headers: {Authorization: `Bearer ${process.env.BR_API_KEY}`, Accept: process.env.BR_ACCEPT}};
    let query = [];
    Object.keys(req.query).map((queryName) => {
        query.push(`tag[${queryName}]=${req.query[queryName]}`);
    });
    query = query.toString().replace(",", "&");

    axios.get(`${process.env.BR_URL}/teams?${query}`, headers
    )
        .then(teams => {
            let members = [];
            teams.data.data.map(member => {
                members.push(...member.attributes.stats.members)
            });
            members = members.filter((item, pos) => members.indexOf(item) === pos);

            const response = {
                status: 200,
                count: teams.data.data.length
            };
            axios.get(`${process.env.BR_URL}/players?filter[playerIds]=${members}`, headers)
                .then(players => {
                    response.collection = teams.data.data.map(team => {
                        return {
                            teamInfo: {
                                id: team.id,
                                ...new Team(team.attributes)
                            },
                            members: team.attributes.stats.members
                            /*playersInfo: team.attributes.stats.members.map(member => {
                                return players.data.data.filter(player => player.id === member)
                            }).forEach(element=>playerInfo(element[0].attributes)),*/
                        }
                    });
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