const mongoose = require('mongoose');

const verbSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    verb: {type: String, required: true},
    auxiliar: {type: String, required: true, enum: ['etre', 'avoir'], default: 'avoir'},
    startWithVowel: {type: Boolean, required: true, default: false},
    startsWith: {type: String, required: true},
    conjugations: {type: Object, required: false}
});

module.exports = new mongoose.model('Verb', verbSchema);