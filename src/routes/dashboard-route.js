// Dependencias
const {Router} = require('express');
const {authMiddleware} = require('../middleware/auth-middleware');

// Controllers
const dashboardRelatoriosController = require('../controllers/Relatorios/dashboard-relatorios-controller');
const armasRelatorioController = require('../controllers/Relatorios/armas-relatorio-controller');

//Rotas
const routerDashboard = Router();

routerDashboard.get('/dashboards/relatorios', authMiddleware, dashboardRelatoriosController.index);
routerDashboard.get('/dashboards/relatorios/usuario/:id', authMiddleware, dashboardRelatoriosController.acautelamentosPorUsuario);
routerDashboard.get('/dashboards/relatorios/armeiro/', authMiddleware, dashboardRelatoriosController.acautelamentosEmAbertoArmeiro);

routerDashboard.get('/dashboards/armas/tipo', authMiddleware, armasRelatorioController.armasPorTipo);
routerDashboard.get('/dashboards/armas/estado-conservacao', authMiddleware, armasRelatorioController.armasPorEstadoConservacao);
routerDashboard.get('/dashboards/armas/ano', authMiddleware, armasRelatorioController.armasPorAno);

module.exports = {routerDashboard}