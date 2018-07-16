const express = require("express");
const router = express.Router();
require("dotenv").config();
const handler = require("../services/handler");
const fs = require("fs");
const formidable = require("formidable");

function createDir(sec) {
    const directory = `./uploads/champions/${sec}`;
    if (!fs.existsSync(directory)) fs.mkdirSync(directory);
}

router.post("/:champion/:type", (req, res) => {
    const championName = req.params.champion;
    const type = req.params.type;
    const form = new formidable.IncomingForm();
    let promise = new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (!files.file) {
                console.log(files.file);
                return reject("Can't find your file.");
            }

            createDir(championName);
            createDir(`${championName}/${type}`);
            const dir = `uploads/champions/${championName}/${type}`;

            // Temp path
            const oldpath = files.file.path;
            // Saving path
            const newpath = `./${dir}/${files.file.name}`;

            const stream = fs.createReadStream(oldpath);
            stream.on("error", () => {
                return reject("Can't find your file.")
            });
            stream.pipe(fs.createWriteStream(newpath));
            stream.on("end", () => resolve({
                path: `${process.env.URL}/${dir}/${files.file.name}`,
                message: "File uploaded successfully."
            }));
        });
    });
    promise
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(msg => {
            handler({
                req, res,
                status: 500,
                message: msg
            });
        });
});

module.exports = router;