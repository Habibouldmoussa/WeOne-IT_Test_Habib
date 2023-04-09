// Importation des models et des plugin nécessaire 
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Récuperation du token dans les variable d'environement 
const RANDOM_TOKEN_SECRET = process.env.APP_SECRET
//-------------------------------------------------

// le middelware verifie si le token du client bon est execute la route si tout est correct 
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin;
        if (req.params.id !== undefined && req.params.id != userId && !isAdmin) {
            console.log("Vous n'etes pas autorisé a consulté cette urilisateur")
            throw new Error("Vous n'etes pas autorisé a consulté cette urilisateur");

        }

        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};