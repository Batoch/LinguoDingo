var express = require("express");
var router = express.Router();
var fetchUrl = require("node-fetch");
const translate = require('@iamtraction/google-translate');
var mots = {}

router.get("/", function(req, res) {
    res.send("API is working properly");
});

router.get("/motrandom", (req, res) => {
  mots = {}
  mots.def = {}
  //getrandomword().then(word => gettrad(word)).then(trans => checkanddef(trans)).then(mots => res.status(200).json(mots))
  getrandomword().then(word => gettrad(word)).then(trans => checkanddef(trans)).then(function(mots){
    res.status(200).json(mots)
    console.log(mots)
  })
});

function getrandomword(){
  return new Promise(resolve => {
    fetchUrl('https://random-word-api2.herokuapp.com/word?number=1')
      .then(res => res.json())
      .then(json => resolve(json[0]));
  });
}

function gettrad(word){
  return new Promise(resolve => {
    console.log(word)
    mots.en = word;
    translate(word, { from: 'en', to: 'fr' })
      .then(val => resolve(val))
      .catch(console.error);
  });
}

function checkanddef(val){
  return new Promise(resolve => {
    if(val.from.language.didYouMean == true){
      // If google translate is not sure
      getrandomword().then(word => gettrad(word)).then(trans => checkanddef(trans)).then(mots => resolve(mots))
    }
    else {
      mots.fr = val.text
      fetchUrl('https://api.dictionaryapi.dev/api/v2/entries/en_US/' + mots.en)
        .then(res => res.json())
        .then(function(json) {
          mots.def.en = 'No Definitions Found'
          if(json.title != 'No Definitions Found'){
            if(json[0].meanings[0] != ''){
              mots.def.en = json[0].meanings[0].definitions[0].definition
            }
          }
          if(mots.def.fr != undefined){
            resolve(mots)
          }
        });
      fetchUrl('https://api.dictionaryapi.dev/api/v2/entries/fr/' + mots.fr)
        .then(res => res.json())
        .then(function(json) {
          mots.def.fr = "Pas de definition trouvée"
          if(json.title != 'No Definitions Found'){
            if(json[0].meanings[0] != ''){
              mots.def.fr = json[0].meanings[0].definitions[0].definition
            }
          }
          if(mots.def.en != undefined){
            resolve(mots)
          }
        });
    }
  });
}

module.exports = router;
