const express = require('express');
const router = express.Router();
const fs = require('fs');
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

const VerbController = require('../controllers/verb.controller');

router.get('/createAll', (req, res, next) => {
    
    createVerbs(res)
    .then(response => {
        res.status(200).json({
            message: 'Verbs saved successfully'
        });
    });    
});

router.get('/:name', (req, res, next) => {
    const name = req.params.name;
    if(name!== undefined){
        VerbController.find(name)
        .then(response => {
            return res.status(200).json({
                message: 'Verb fetched successfully',
                data: response
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: {
                    message: 'Oops... Something went wrong'
                }
            });
        })
    }else{
        return res.status(404).json({
            message: 'Verb not found'
        });
    }

    
});

router.get('/auxiliar/:auxiliar', (req, res, next) => {
    const auxiliar = req.params.auxiliar;
    if(auxiliar!== undefined){
        VerbController.findWithAuxiliar(auxiliar)
        .then(response => {
            return res.status(200).json({
                message: 'Verbs fetched successfully',
                data: response
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: {
                    message: 'Oops... Something went wrong'
                }
            });
        })
    }else{
        return res.status(404).json({
            message: 'Auxiliar not found'
        });
    }

    
});

router.get('/startsWith/:vowel', (req, res, next) => {
    const vowel = req.params.vowel;
    if(vowel!== undefined){
        VerbController.findStartsWith(vowel)
        .then(response => {
            return res.status(200).json({
                message: 'Verbs fetched successfully',
                data: response
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                error: {
                    message: 'Oops... Something went wrong'
                }
            });
        })
    }else{
        return res.status(404).json({
            message: 'Auxiliar not found'
        });
    }

    
});

async function createVerbs(res){
    for (letter of alphabet) {
        const letter = 'a';
        const verbes = JSON.parse(fs.readFileSync(`./data/verbes/${letter}.json`));
        for (el of verbes) {
            if(el.value !== undefined){
                VerbController.createVerb({
                    verb: el.value,
                    conjugations: el.obj
                })
                .then(response => {
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }

    return true;
}

module.exports = router;