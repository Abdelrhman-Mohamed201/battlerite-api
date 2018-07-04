require("dotenv").config();
const axios = require("axios");


module.exports = function Team(data) {
    this.name = data.name;
    this.avatar = data.stats.avatar;
    this.wins = data.stats.wins;
    this.losses = data.stats.losses;

    this.division = {};
    this.division.division = data.stats.division;
    this.division.divisionRating = data.stats.divisionRating;
    this.division.topDivisionRating = data.stats.topDivisionRating;

    this.league = {};
    this.league.league = data.stats.league;
    this.league.topLeague = data.stats.topLeague;
};
