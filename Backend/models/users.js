// Importation des models et des plugin nécessaire 
const mongoose = require('mongoose');
// Le schéme de la table user de la base de donnée 
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model('Users', userSchema);