/** Check if we got value from API or not
 *
 * @param value
 * @returns {number}
 */
exports.checkValue = value => {
    return value ? value : 0
};

/** Convert the time played to human readable format
 *
 * @param timePlayed
 * @returns {string} The time converted to human format
 */
exports.timeConversion = timePlayed => {
    let millisec = +timePlayed * 1000;
    let seconds = Math.floor((millisec / 1000).toFixed(1));
    let minutes = Math.floor((millisec / (1000 * 60)).toFixed(1));
    let hours = Math.floor((millisec / (1000 * 60 * 60)).toFixed(1));
    let days = Math.floor((millisec / (1000 * 60 * 60 * 24)).toFixed(1));

    if (seconds < 60) {
        return seconds + " seconds"
    } else if (minutes < 60) {
        return minutes + " minutes"
    } else if (hours < 24) {
        return hours + " hours"
    } else {
        return days + " days"
    }
};

/**
 *
 * @param num Picture number in stats
 * @returns {string} Picture URL
 */
exports.playerPicture = num => {
    return `https://battlerite-stats.com/uploads/avatars/Drop_${num.toString().split("390")[1]}.png`
};

/** Round to 1 decimal
 *
 * @param win {number}
 * @param lose {number}
 * @returns {number} Win rate percentage
 */
exports.round1dec = (win, lose) => {
    return Math.round((win * 100) / (win + lose) * 10) / 10;
};

/** Return a clean variables
 *
 * @param win {number}
 * @param lose {number}
 * @returns {{win: number, lose: number, winRate: number}}
 */
exports.playerState = (win, lose) => {
    return {
        win: win ? win : 0,
        lose: lose ? lose : 0,
        winRate: win > 0 ? `${this.round1dec(win, lose)}%` : "0%"
    }
};

