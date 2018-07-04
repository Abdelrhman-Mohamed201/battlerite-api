const stackables = require("../mappings/45166/stackables");
const Champion = require("./championClass");

const championsArr = [
    {"id": "01", "type": "support"},
    {"id": "02", "type": "support"},
    {"id": "03", "type": "ranged"},
    {"id": "04", "type": "ranged"},
    {"id": "05", "type": "melee"},
    {"id": "06", "type": "support"},
    {"id": "07", "type": "ranged"},
    {"id": "08", "type": "ranged"},
    {"id": "09", "type": "support"},
    {"id": "10", "type": "ranged"},
    {"id": "11", "type": "support"},
    {"id": "12", "type": "melee"},
    {"id": "13", "type": "melee"},
    {"id": "14", "type": "ranged"},
    {"id": "15", "type": "melee"},
    {"id": "16", "type": "ranged"},
    {"id": "17", "type": "melee"},
    {"id": "18", "type": "melee"},
    {"id": "19", "type": "support"},
    {"id": "20", "type": "ranged"},
    {"id": "21", "type": "melee"},
    {"id": "22", "type": "support"},
    {"id": "25", "type": "melee"},
    {"id": "35", "type": "support"},
    {"id": "39", "type": "support"},
    {"id": "41", "type": "ranged"},
    {"id": "43", "type": "melee"},
];

module.exports = stats => {
    let champions = [];
    championsArr.map(champ => {
        let obj = stackables.Mappings.filter(obj => {
            return obj.StackableId === parseInt(`100${champ.id}`);
        })[0];
        champions.push(new Champion({obj, id: champ.id, stats}));
    });
    champions = champions.sort((a, b) => b.level - a.level);
    return champions;
};