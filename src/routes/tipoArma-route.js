const { Router } = require('express')
const { authMiddleware } = require('../middleware/auth-middleware');

//Controllers

const addTipoArmaController = require('../controllers/TipoArma/add-tipoArma-controller');
const findTipoArmaController = require('../controllers/TipoArma/find-tipoArma-controller');
const updateTipoArmaController = require('../controllers/TipoArma/update-tipoArma-controller');

//Rotas
const routerTipoArma = Router()

routerTipoArma.post('/tipoArma', authMiddleware, addTipoArmaController.novoTipo)
routerTipoArma.get('/tipoArma', authMiddleware, findTipoArmaController.findAll)
routerTipoArma.put('/tipoArma/:id', authMiddleware, updateTipoArmaController.update)


module.exports = { routerTipoArma }