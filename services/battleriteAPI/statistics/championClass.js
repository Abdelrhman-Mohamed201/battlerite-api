const funcs = require("../functions");

module.exports = function Champion({obj, id, stats}) {
    this.id = parseInt(id);
    this.name = obj.EnglishLocalizedName;
    this.icon = obj.Icon;
    this.wideIcon = obj.WideIcon;
    this.devName = obj.DevName;
    this.xp = funcs.checkValue(stats[`110${id}`]);
    this.win = funcs.checkValue(stats[`120${id}`]);
    this.lose = funcs.checkValue(stats[`130${id}`]);
    this.kills = funcs.checkValue(stats[`140${id}`]);
    this.deaths = funcs.checkValue(stats[`150${id}`]);
    this.kdRatio = this.deaths ? funcs.round1dec(this.kills, this.deaths) : 0;
    this.level = funcs.checkValue(stats[`400${id}`]);
    this.winRate = this.win > 0 ? funcs.round1dec(this.win, this.lose) : 0;

    this.timePlayed = funcs.checkValue(stats[`160${id}`]);
    this.timePlayedFormated = funcs.timeConversion(this.timePlayed);
    this.winPerTimePlayed = this.timePlayed ? Math.floor(this.win / this.timePlayed * 10000) : 0;

    this.ranked = {};
    this.ranked.v2 = {
        wins: funcs.checkValue(stats[`170${id}`]),
        losses: funcs.checkValue(stats[`180${id}`]),
    };
    this.ranked.v3 = {
        wins: funcs.checkValue(stats[`190${id}`]),
        losses: funcs.checkValue(stats[`200${id}`]),
    };
    this.ranked.totalWins = this.ranked.v2.wins + this.ranked.v3.wins;
    this.ranked.totalLosses = this.ranked.v2.losses + this.ranked.v3.losses;
    this.ranked.winRate = this.ranked.totalLosses > 0 ? `${funcs.round1dec(this.ranked.totalWins, this.ranked.totalLosses)}%` : "0%";

    this.unranked = {};
    this.unranked.v2 = {
        wins: funcs.checkValue(stats[`210${id}`]),
        losses: funcs.checkValue(stats[`220${id}`])
    };
    this.unranked.v3 = {
        wins: funcs.checkValue(stats[`230${id}`]),
        losses: funcs.checkValue(stats[`240${id}`])
    };
    this.unranked.totalWins = this.unranked.v2.wins + this.unranked.v3.wins;
    this.unranked.totalLosses = this.unranked.v2.losses + this.unranked.v3.losses;
    this.unranked.winRate = this.unranked.totalLosses > 0 ? `${funcs.round1dec(this.unranked.totalWins, this.unranked.totalLosses)}%` : "0%";

    this.brawl = {};
    this.brawl.wins = funcs.checkValue(stats[`250${id}`]);
    this.brawl.losses = funcs.checkValue(stats[`260${id}`]);
    this.brawl.winRate = this.brawl.losses > 0 ? `${funcs.round1dec(this.brawl.wins, this.brawl.losses)}%` : "0%";
};