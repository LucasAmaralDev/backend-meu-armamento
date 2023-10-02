const {Router} = require('express')
const {authMiddleware} = require('../middleware/auth-middleware')

const addBatalhaoController = require('../controllers/Batalhao/add-batalhao-controller')
const findBatalhaoController = require('../controllers/Batalhao/find-batalhao-controller')
const updateBatalhaoController = require('../controllers/Batalhao/update-batalhao-controller')
const deleteBatalhaoController = require('../controllers/Batalhao/delete-batalhao-controller')

const routerBatalhao = Router()

routerBatalhao.post('/batalhao', authMiddleware, addBatalhaoController.novoBatalhao)
routerBatalhao.get('/batalhao', authMiddleware, findBatalhaoController.findAll)
routerBatalhao.put('/batalhao/:id', authMiddleware, updateBatalhaoController.update)
routerBatalhao.delete('/batalhao/:id', authMiddleware, deleteBatalhaoController.delete)


module.exports = {routerBatalhao}