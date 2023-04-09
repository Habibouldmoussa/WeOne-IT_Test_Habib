// Importation des routes, middleware, controllers et des plugin nécessaire 
const express = require('express');
const router = express.Router();
const checkToken = require('../middleware/checkToken');
const checkGeneralKey = require('../middleware/checkGeneralKey');
const logoCtrl = require('../controllers/logos');
const isAdmin = require('../middleware/admin');

// On apprlique les méthodes et les middlewares necessaire et les controlleurs pour chaque routes  
router.get('/', checkGeneralKey, checkToken, logoCtrl.getAllLogo);//
router.post('/', checkGeneralKey, isAdmin, checkToken, logoCtrl.createLogo); // checkGeneralKey,
router.get('/:id', checkGeneralKey, checkToken, logoCtrl.getOneLogo);
router.put('/:id', checkGeneralKey, isAdmin, checkToken, logoCtrl.modifyLogo);
router.delete('/:id', checkGeneralKey, isAdmin, checkToken, logoCtrl.deleteLogo);

module.exports = router;