const { Router } = require("express")
const { authMiddleware } = require("../middleware/auth-middleware")


const signupArmeiroController = require("../controllers/Armeiro/signup-armeiro-controller")
const loginArmeiroController = require("../controllers/Armeiro/login-armeiro-controller")
const findArmeiroController = require("../controllers/Armeiro/find-armeiro-controller")
const updateArmeiroController = require("../controllers/Armeiro/update-armeiro-controller")
const deleteArmeiroController = require("../controllers/Armeiro/delete-armeiro-controller")


const routerArmeiros = Router()

//Cadastro e login
routerArmeiros.post("/signup", signupArmeiroController.signup)
routerArmeiros.post("/login", loginArmeiroController.login)

//Busca de armeiros
routerArmeiros.get("/armeiro/find", authMiddleware, findArmeiroController.findAll)
routerArmeiros.get("/armeiro/find/:id", authMiddleware, findArmeiroController.findOne)
routerArmeiros.get("/get-my-info", authMiddleware, findArmeiroController.myInfo)

//Atualização de armeiros
routerArmeiros.put("/armeiro/update/:id", authMiddleware, updateArmeiroController.update)
routerArmeiros.put("/armeiro/update/password/:id", authMiddleware, updateArmeiroController.updatePassword)

//Deleção de armeiros
routerArmeiros.delete("/armeiro/delete/:id", authMiddleware, deleteArmeiroController.delete)

module.exports = {routerArmeiros} 