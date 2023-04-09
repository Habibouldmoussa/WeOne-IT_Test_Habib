// Importation des models et des plugin nécessaire 
const mongoose = require('mongoose');
// Le schema de la table de logo de la base de donnée 
const logoSchema = mongoose.Schema({
    File: { type: String, required: true },
    svg: { type: String, required: true }
});

module.exports = mongoose.model('Logos', logoSchema);