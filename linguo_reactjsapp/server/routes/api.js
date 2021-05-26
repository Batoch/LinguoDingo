var express = require("express");
var router = express.Router();
const mots = require('../data/mots.json');

router.get("/", function(req, res, next) {
    res.send("API is working properly");
});

router.get("/motrandom", (req, res) => {
    res.status(200).json(mots.mots[getRandomInt(mots.mots.length)]);
  });

function getRandomInt(max) {
return Math.floor(Math.random() * max);
}

module.exports = router;