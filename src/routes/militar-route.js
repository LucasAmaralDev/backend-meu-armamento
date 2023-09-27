// Dependencias
const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');

// Controllers
const addUsuarioController = require('../controllers/Militar/add-militar-controller');
const findMilitarController = require('../controllers/Militar/find-militar-controller');
const updateMilitarController = require('../controllers/Militar/update-militar-controller');
const deleteMilitarController = require('../controllers/Militar/delete-militar-controller');

//Rotas
const routerMilitar = Router();

routerMilitar.post('/militares/add', authMiddleware, addUsuarioController.add);
routerMilitar.get('/militares/find', authMiddleware, findMilitarController.find);
routerMilitar.get('/militares/find/:id', authMiddleware, findMilitarController.findById);
routerMilitar.put('/militares/update/:id', authMiddleware, updateMilitarController.update);
routerMilitar.delete('/militares/delete/:id', authMiddleware, deleteMilitarController.delete);

module.exports = { routerMilitar }