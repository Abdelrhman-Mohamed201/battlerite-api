const funcs = require("../functions");

module.exports = data => {
    let player = {};

    player.name = data.name;
    player.flag = data.stats.displayFlags;
    player.picture = data.stats.picture;
    player.title = data.stats.title;
    player.wins = funcs.checkValue(data.stats["2"]);
    player.lose = funcs.checkValue(data.stats["3"]);
    player.totalMatches = player.wins + player.lose;
    player.winRate = player.wins ? `${funcs.round1dec(player.wins, player.lose)}%` : 0;
    player.level = funcs.checkValue(data.stats["26"]);
    player.xp = funcs.checkValue(data.stats["25"]);
    player.ratingMean = funcs.checkValue(data.stats["70"]);
    player.ratingDev = funcs.checkValue(data.stats["71"]);
    player.vsAIPlayed = funcs.checkValue(data.stats["56"]);
    player.timePlayed = funcs.checkValue(data.stats["8"]);
    player.gradeScore = funcs.checkValue(data.stats["4"]);
    player.league = {
        v2: funcs.playerState(data.stats["14"], data.stats["15"]),
        v3: funcs.playerState(data.stats["16"], data.stats["17"]),
    };
    player.quickmatch = {
        v2: funcs.playerState(data.stats["10"], data.stats["11"]),
        v3: funcs.playerState(data.stats["12"], data.stats["13"]),
        brawl: funcs.playerState(data.stats["18"], data.stats["19"]),
    };

    return player;
};