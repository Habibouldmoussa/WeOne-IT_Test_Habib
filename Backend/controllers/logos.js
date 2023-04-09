// Importation des models et des plugin nécessaire 
const Logo = require('../models/logos');
const fs = require('fs');
//-----------------------------------------------

/* Création des logos 
*@param { object HTTP } req
*@property { binary } req.file - l'image uplouadée
*@property { JSON } req.body.Logo - logo 
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } Message
*/
exports.createLogo = (req, res, next) => {
    //const logoObject = JSON.parse(req.body.logo);
    const logoObject = req.body;
    console.log(req.body);
    const filename = Date.now();
    fs.writeFile("assets/" + filename + ".svg", logoObject.svg, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
    const logo = new Logo({
        ...logoObject,
        File: `${req.protocol}://${req.get('host')}/assets/${filename}.svg`
    });
    // On sauvgarde le logo dans la base de donnée 
    logo.save()
        .then(() => { res.status(201).json({ message: 'logo enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })

};

/* Récuperation d'un seul logo
*@param { object HTTP  } req
*@property { String } req.params.id - l'id de logo à afficher*
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } logo
*/
exports.getOneLogo = (req, res, next) => {
    Logo.findOne({ _id: req.params.id })
        .then(logo => res.status(200).json(logo))
        .catch(error => res.status(404).json({ error: error }));
};

/* Modification d'un logo
*@param { object HTTP  } req
*@property { binary } req.file - l'image uplouadée
*@property { JSON } req.body.Logo - logo 
*@property { String } req.params.id - l'id de logo à afficher*
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } message
*/
exports.modifyLogo = (req, res, next) => {
    const logoObject = req.body
    delete logoObject._id;

    Logo.findOne({ _id: req.params.id })
        .then((logo) => {
            let filename = logo.File.split('/assets/')[1];
            fs.unlink(`assets/${filename}`, (err) => {
                if (err) { console.log(err); } else {
                    filename = Date.now()
                    fs.writeFile("assets/" + filename + ".svg", logoObject.svg, (err) => {
                        if (err) throw err;
                        // On update le logo dans la base de donnée 
                        Logo.updateOne({ _id: req.params.id }, {
                            ...logoObject,
                            File: `${req.protocol}://${req.get('host')}/assets/${filename}.svg`,
                            _id: req.params.id
                        })
                            .then(() => res.status(200).json({ message: 'logo modifié!' }))
                            .catch(error => res.status(401).json({ error }));
                        console.log('The file has been saved!');
                    })
                }
            });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

/*suppression de logo 
*@param { object HTTP  } req
*@property { String } req.params.id - l'id de logo à afficher*
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } message
*/
exports.deleteLogo = (req, res, next) => {
    // on récupere le logo à supprimer
    Logo.findOne({ _id: req.params.id })
        .then(logo => {
            const filename = logo.File.split('/assets/')[1];
            fs.unlink(`assets/${filename}`, (err) => {
                if (err) { console.log(err); }
            });
            //supprimé de la base de donnée 
            Logo.deleteOne({ _id: req.params.id })
                .then(() => { res.status(200).json({ message: 'logo supprimé !' }) })
                .catch(error => res.status(401).json({ error }));
        }).catch(error => {
            res.status(500).json({ error });
        });
};

/* On affiche la totalité des logos de la base de donnée
*@param { object HTTP  } req
*@param { object HTTP } res 
*@param { String } next
*@return { JSON } logos
*/
exports.getAllLogo = (req, res, next) => {
    Logo.find()
        .then(logos => res.status(200).json(logos))
        .catch(error => res.status(400).json({ error: error }));
};
