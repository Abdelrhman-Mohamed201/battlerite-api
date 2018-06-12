const Tokens = require("../models/tokens");
const ms = require("ms");

function ArrayPlusDelay(array, delegate, delay) {
    let i = 0;

    // seed first call and store interval (to clear later)
    let interval = setInterval(function() {
        // each loop, call passed in function
        delegate(array[i]);
        let index = array.indexOf(array[i]);
        if (index > -1) {
            array.splice(index, 1);
        }

        // increment, and if we're past array, clear interval
        if (i++ >= array.length - 1)
            clearInterval(interval);
    }, delay);

    return interval
}

module.exports = ({req, token, expiresIn}) => {
    console.log(expireToken);
    expireToken.push(token);
    const updateOps = {
        updatedAt: Date.now(),
        state: "dead",
    };
    ArrayPlusDelay(expireToken, (token) => {
        Tokens.update({token}, {$set: updateOps}).exec()
    }, ms(expiresIn));
    console.log(expireToken);
};