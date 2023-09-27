// Dependencias
const {Router} = require('express');
const {authMiddleware} = require('../middleware/auth-middleware');

// Controllers
const dashboardRelatoriosController = require('../controllers/Relatorios/dashboard-relatorios-controller');

//Rotas
const routerDashboard = Router();

routerDashboard.get('/dashboards/relatorios', authMiddleware, dashboardRelatoriosController.index);
routerDashboard.get('/dashboards/relatorios/usuario/:id', authMiddleware, dashboardRelatoriosController.acautelamentosPorUsuario);
routerDashboard.get('/dashboards/relatorios/armeiro/', authMiddleware, dashboardRelatoriosController.acautelamentosEmAbertoArmeiro);

module.exports = {routerDashboard}