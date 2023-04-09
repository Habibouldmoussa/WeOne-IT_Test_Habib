// Récuperation des plugin et models nécessaire
const express = require('express');
const app = express();
const mongoose = require('mongoose');
/* Récuperation du token dans les variable d'environement  
* le fichier d'environement .env doit contenir : 
* PORT : le port de l'API qui 3000 par defaut
* PORT= 3000
* MONGODB_URL = "lien de connexion a votre base de donnée"
* LOGIN = "login admin"
* PASS = "pass admin"
* APP_SECRET="chaine de caractaire pour encoder le token"
*/
const dotenv = require("dotenv");
dotenv.config();
const path = require('path');
const logosRoutes = require('./routes/logos');
const userRoutes = require('./routes/users');
const rateLimit = require('./models/limitrate')
// Url de la base de donnée 
const MY_MONGODBURL = process.env.MONGODB_URL;
//-------------------------------------------
// Connexion à la base de donnée
mongoose.set('strictQuery', true);
mongoose.connect(MY_MONGODBURL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
// ajouter les differants plugins à notre application express 
app.use(express.json());
app.use(rateLimit);

// on configure quelques regle de cross control  
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:4200/");
    // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*');
    // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization,x-general-key');
    // on indique les méthodes autorisées pour les requêtes HTTP
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
// Création des routes 
app.use('/logos', logosRoutes);
app.use('/users', userRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));

module.exports = app;