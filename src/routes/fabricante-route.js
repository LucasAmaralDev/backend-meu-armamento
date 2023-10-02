const { Router } = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');

const addFabricanteController = require('../controllers/Fabricante/add-fabricante-controller');
const findFabricanteController = require('../controllers/Fabricante/find-fabricante-controller');
const updateFabricanteController = require('../controllers/Fabricante/update-fabricante-controller');
const deleteFabricanteController = require('../controllers/Fabricante/delete-fabricante-controller');

const routerFabricante = Router();

routerFabricante.post('/fabricante', authMiddleware, addFabricanteController.novoFabricante);
routerFabricante.get('/fabricante', authMiddleware, findFabricanteController.findAll);
routerFabricante.put('/fabricante/:id', authMiddleware, updateFabricanteController.update)
routerFabricante.delete('/fabricante/:id', authMiddleware, deleteFabricanteController.delete)

module.exports = { routerFabricante }