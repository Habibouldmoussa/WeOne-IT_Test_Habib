// Importation des models et des plugin nécessaire 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
var CryptoJS = require("crypto-js");
dotenv.config();
// Récuperation du token dans les variable d'environement 
const RANDOM_TOKEN_SECRET = process.env.APP_SECRET
// le middelware verifie si le token du client bon est execute la route si tout est correct 
module.exports = (req, res, next) => {
    //try {
    const x_general_key = req.headers["x-general-key"]
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
    const key_decrypt = decodedToken.userId.slice(0, 16);
    const decrypted = CryptoJS.AES.decrypt(x_general_key, key_decrypt);
    const timestamp = decrypted.toString(CryptoJS.enc.Utf8);

    if ((Date.now() - +timestamp) <= 100000) {
        next();

    } else {
        res.status(401).json({ error: "votre clé de requete à périmé" });
    }

    // } catch (error) {
    //     res.status(401).json({ error });
    // }
};