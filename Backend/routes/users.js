// Importation des routes, controllers et des plugin nécessaire 
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users');
const checkToken = require('../middleware/checkToken');
const checkGeneralKey = require('../middleware/checkGeneralKey');
const isAdmin = require('../middleware/admin')
// les routes pour l'identification et la création d'utilisateur 

router.get('/', checkGeneralKey, checkToken, userCtrl.getAllUsers);
router.post('/', checkGeneralKey, isAdmin, checkToken, userCtrl.createUser);
router.get('/:id', checkGeneralKey, checkToken, userCtrl.getOneUser);
router.put('/:id', checkGeneralKey, isAdmin, checkToken, userCtrl.modifyUser);
router.delete('/:id', checkGeneralKey, isAdmin, checkToken, userCtrl.deleteUser);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;