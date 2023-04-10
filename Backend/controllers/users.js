// Récuperation des plugin et models nécessaire
const bcrypt = require('bcrypt')
const User = require('../models/users')
const passwordvalid = require('../models/password')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// Récuperation du token dans les variable d'environement 
const RANDOM_TOKEN_SECRET = process.env.APP_SECRET

/* Création un Utilisateur 
*@param { object HTTP } req
*@property { JSON } req.body - utilisateur 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.createUser = (req, res, next) => {
    //const userObject = JSON.parse(req.body.User);
    const userObject = req.body;
    const user = new User({
        ...userObject
    });
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: hash
            });
            // Sauvgarde de l'user dans la base de donnée 
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};
/* Modification d'un Utilisateur 
*@param { object HTTP } req
*@property { JSON } req.body - utilisateur 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.modifyUser = (req, res, next) => {
    const userObject = req.body
    User.findOne({ _id: req.params.id })
        .then((user) => {
            // On update le User dans la base de donnée 
            User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'Utilisateur modifié!' }))
                .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};
/* Création un Utilisateur 
*@param { object HTTP } req
*@property { JSON } req.body - utilisateur 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(Users => res.status(200).json(Users))
        .catch(error => res.status(400).json({ error: error }));
};
/* Affiché un Utilisateur 
*@param { object HTTP } req
*@property { JSON } req.body - utilisateur 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(User => res.status(200).json(User))
        .catch(error => res.status(404).json({ error: error }));
};
/*supprimé un Utilisateur 
*@param { object HTTP } req
*@property { JSON } req.body - utilisateur 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.deleteUser = (req, res, next) => {
    // on récupere le User à supprimer
    User.findOne({ _id: req.params.id })
        .then(user => {
            //supprimé de la base de donnée 
            User.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'User supprimé !' }) })
                .catch(error => res.status(401).json({ error }));
        }).catch(error => {
            res.status(500).json({ error });
        });
};

// Création d'utilisateur 
exports.signup = (req, res, next) => {
    // On passe le mot de passe au validateur 
    if (passwordvalid.validate(req.body.password)) {
        // Si le mot de passe est valide on le hash 10 fois
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash
                });
                // Sauvgarde de l'user dans la base de donnée 
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(500).json({ error }));

    } else {
        return res.status(422).json({ error: 'le mot de passe est pas assez fort ' + passwordvalid.validate(req.body.password, { list: true }) })
    }

};
// Connexion de l'utilisateur 
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            // On verifie si l'utilisateur existe on ne transmet pas l'information au client pour ne pas indiqué si le mail est inscrit ou pas pour des raison de discretion 
            if (!user) {
                return res.status(401).json({ error });
            }
            // On compare les mot de passe hashé 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error });
                    }
                    // si le mot de passe coresspond on donne un token au client 
                    res.status(200).json({
                        userId: user._id,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            {
                                isAdmin: user.isAdmin,
                                userId: user._id
                            },
                            RANDOM_TOKEN_SECRET,
                            { expiresIn: '1h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(401).json({ error: "User don't exist" }));
};

