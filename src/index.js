//Dependencias
require('./database');
console.log('Database conectado')
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// Rotas
const { routerArmeiros } = require('./routes/armeiro-route');
const { routerArmas } = require('./routes/arma-route');
const { routerMilitar } = require('./routes/militar-route');
const { routerAcautelamento } = require('./routes/acautelamento-route');
const { routerDashboard } = require('./routes/dashboard-route');
const { routerFabricante } = require('./routes/fabricante-route');
const { routerTipoArma } = require('./routes/tipoArma-route');
const { routerBatalhao } = require('./routes/batalhao-route');

// Configurações

const app = express();
app.use(cors());
app.use(express.json());

// Inserção de Rotas
app.use(routerArmeiros)
app.use(routerArmas)
app.use(routerMilitar)
app.use(routerAcautelamento)
app.use(routerDashboard)
app.use(routerFabricante)
app.use(routerTipoArma)
app.use(routerBatalhao)






app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.EXPRESS_PORT}`);
}
);