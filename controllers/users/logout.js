const deadToken = require("../tokens/expire");

module.exports = (req,res)=>{
    deadToken({req,res});
};