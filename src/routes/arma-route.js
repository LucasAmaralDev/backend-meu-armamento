//Dependencias
const { Router } = require("express")
const { authMiddleware } = require("../middleware/auth-middleware")

// Controllers
const addArmaController = require("../controllers/Arma/add-arma-controller")
const findArmaController = require("../controllers/Arma/find-arma-controller")
const updateArmaController = require("../controllers/Arma/update-arma-controller")
const deleteArmaController = require("../controllers/Arma/delete-arma-controller")

//Rotas
const routerArmas = Router()

routerArmas.post("/arma/add", authMiddleware, addArmaController.add)

routerArmas.get("/arma/find", authMiddleware, findArmaController.findAll)
routerArmas.get("/arma/find/:id", authMiddleware, findArmaController.findOne)

routerArmas.put("/arma/update/:id", authMiddleware, updateArmaController.update)

routerArmas.delete("/arma/delete/:id", authMiddleware, deleteArmaController.delete)

module.exports = { routerArmas }