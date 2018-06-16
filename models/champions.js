const mongoose = require("mongoose");

const championsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true},
    // avatar: {type: mongoose.Schema.Types.ObjectId, ref: '', required: true},
    bio: {type: String, required: true},
    hp: {type: Number, required: true},
    name: {type: String, required: true},
    slogan: {type: String, required: true},
    type: {type: String, required: true},
    basicGuide: {type: Array},
    masterGuide: {type: Array},
    status: {type: Array},
    combos: {type: Array},
    spells: {type: Array, required: true},
    battlerites: {type: Array, required: true},
    quote: {type: Array},
}, {timestamps: true}, {collection: "champions"});

x={
    "bio": "Champion bio",
    "hp": "250",
    "name": "Champion name",
    "type": "Champion type",
    "slogan": "Champion slogan",
    "basicGuide": [
        {
            "title": "Champion basicGuideTitle 1",
            "description": "Champion basicGuideDescription 1"
        },
        {
            "title": "Champion basicGuideTitle 2",
            "description": "Champion basicGuideDescription 2"
        },
        {
            "title": "Champion basicGuideTitle 2",
            "description": "Champion basicGuideDescription 2"
        }
    ],
    "masterGuide": [
        {
            "title": "Champion masterGuideTitle 1",
            "description": "Champion masterGuideDescription 1"
        },
        {
            "title": "Champion masterGuideTitle 2",
            "description": "Champion masterGuideDescription 2"
        },
        {
            "title": "Champion masterGuideTitle 2",
            "description": "Champion masterGuideDescription 2"
        }
    ],

    "status": [
        {
            "control": [
                {
                    "prop": "Champion statusControl 1",
                    "rate": "60"
                }
            ],
            "damages": [
                {
                    "prop": "Champion statusDamages 1",
                    "rate": "60"
                }
            ],
            "difficulty": [
                {
                    "prop": "Champion statusDifficulty 1",
                    "rate": "60"
                }
            ],
            "protection": [
                {
                    "prop": "Champion statusProtection 1",
                    "rate": "60"
                }
            ],
            "survivability": [
                {
                    "prop": "Champion statusSurvivability 1",
                    "rate": "60"
                }
            ]
        }
    ],

    "combos": [
        {
            "description": "Champion combosDescription 1",
            "skillCombo": "Champion combosSkillCombo 1",
            "difficulty": "10"
        },
        {
            "description": "Champion combosDescription 2",
            "skillCombo": "Champion combosSkillCombo 2",
            "difficulty": "10"
        },
        {
            "description": "Champion combosDescription 3",
            "skillCombo": "Champion combosSkillCombo 3",
            "difficulty": "10"
        }
    ],
    "spells": [
        {
            "description": "Champion spellsDescription 1",
            "keyword": "Champion spellsKeyword 1",
            "name": "Champion spellsName 1",
            "type": ["10", "21"],
            "details": [
                {
                    "name": "Champion spellsDetailsName 1",
                    "prop": "3"
                }
            ]
        },
        {
            "description": "Champion spellsDescription 2",
            "keyword": "Champion spellsKeyword 2",
            "name": "Champion spellsName 2",
            "type": ["20", "22"],
            "details": [
                {
                    "name": "Champion spellsDetailsName 2",
                    "prop": "3"
                }
            ]
        },
        {
            "description": "Champion spellsDescription 3",
            "keyword": "Champion spellsKeyword 3",
            "name": "Champion spellsName 3",
            "type": ["30", "23"],
            "details": [
                {
                    "name": "Champion spellsDetailsName 3",
                    "prop": "3"
                }
            ]
        }
    ],
    "battlerites": [
        {
            "description": "Champion battleritesDescription 1",
            "keyword": "Champion battleritesKeyword 1",
            "name": "Champion battleritesName 1",
            "ex": "false",
            "type": "survival"
        },
        {
            "description": "Champion battleritesDescription 2",
            "keyword": "Champion battleritesKeyword 2",
            "name": "Champion battleritesName 2",
            "ex": "false",
            "type": "survival"
        },
        {
            "description": "Champion battleritesDescription 3",
            "keyword": "Champion battleritesKeyword 3",
            "name": "Champion battleritesName 3",
            "ex": "false",
            "type": "survival"
        }
    ]
}

module.exports = mongoose.model("Champions", championsSchema);