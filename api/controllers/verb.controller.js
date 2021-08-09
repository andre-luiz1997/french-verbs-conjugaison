const mongoose = require('mongoose');
const verbesEtre = ["aller", "arriver", "entrer", "rentrer", "monter", "remonter", "mourir", "naître", "renaître", "partir", "repartir", "retourner", "sortir", "ressortir", "tomber", "retomber", "venir", "revenir", "parvenir", "survenir", "intervenir"];

const Verb = require('../models/verb.model');

exports.createVerb = async (postData) => {
    const verbData = {
        _id: new mongoose.Types.ObjectId(),
        verb: postData.verb,
        auxiliar: verbesEtre.includes(postData.verb) ? 'etre' : 'avoir',
        startsWithVowel: startsWithVowel(postData.verb),
        startsWith: postData.verb.substring(0,1),
        conjugations: postData.conjugations
    };

    const verb = new Verb(verbData);
    return verb.save()
    .then(response => {
        return response;
    })
    .catch(err => {
        throw err;
    });
};

exports.find = async (name) => {
    return await Verb.findOne({verb: name}).select('verb auxiliar startWithVowel conjugations -_id')
    .then(response => {
        return response;
    })
    .catch(err => {
        throw err;
    });
}

exports.findWithAuxiliar = async (auxiliar) => {
    return await Verb.find({auxiliar: auxiliar}).select('verb auxiliar startWithVowel conjugations -_id')
    .then(response => {
        response.count = response.length;
        return response;
    })
    .catch(err => {
        throw err;
    });
}

exports.findStartsWith = async (vowel) => {
    return await Verb.find({startsWith: vowel}).select('verb auxiliar startWithVowel conjugations -_id')
    .then(response => {
        response.count = response.length;
        return response;
    })
    .catch(err => {
        throw err;
    });
}

function startsWithVowel(verb){
    if(verb!==undefined){
        return verb.match('^[aeiouyAEIOUY].*') !== null;
    }
    return false;
}