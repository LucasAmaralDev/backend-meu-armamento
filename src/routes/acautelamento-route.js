// Dependencias
const Router = require('express');
const { authMiddleware } = require('../middleware/auth-middleware');

// Controllers
const cadastrarAcautelamentoController = require('../controllers/Acautelamento/cadastrar-acautelamento-controller');
const findAcautelamentoController = require('../controllers/Acautelamento/find-acautelamento-controller');
const updateAcautelamentoController = require('../controllers/Acautelamento/update-acautelamento-controller');
const deleteAcautelamentoController = require('../controllers/Acautelamento/delete-acautelamento-controller');

//Rotas
const routerAcautelamento = Router();

routerAcautelamento.post('/acautelamento/cadastrar', authMiddleware, cadastrarAcautelamentoController.create);
routerAcautelamento.get('/acautelamento/find', authMiddleware, findAcautelamentoController.findAll);
routerAcautelamento.get('/acautelamento/find/:id', authMiddleware, findAcautelamentoController.findOne);
routerAcautelamento.put('/acautelamento/devolucao/:id', authMiddleware, updateAcautelamentoController.devolucao);
routerAcautelamento.put('/acautelamento/update/:id', authMiddleware, updateAcautelamentoController.update);
routerAcautelamento.delete('/acautelamento/delete/:id', authMiddleware, deleteAcautelamentoController.delete);



module.exports = { routerAcautelamento }
