const { Sequelize } = require('sequelize');
const dbConfig = require('./config');

//Instanciando sequelize
const sequelize = new Sequelize(dbConfig);


//Models
const { ArmeiroModel } = require('../models/Armeiro-model');
const { ArmaModel } = require('../models/Arma-model');
const { MilitarModel } = require('../models/Militar-model');
const { AcautelamentoModel } = require('../models/Acautelamento-model');
const { TipoArmaModel } = require('../models/TipoArma-model');
const { BatalhaoModel } = require('../models/Batalhao-model');
const { FabricanteModel } = require('../models/Fabricante-model');

//Instanciando Models
ArmeiroModel.init(sequelize);
ArmaModel.init(sequelize);
MilitarModel.init(sequelize);
AcautelamentoModel.init(sequelize);
TipoArmaModel.init(sequelize)
BatalhaoModel.init(sequelize);
FabricanteModel.init(sequelize);


//Associando Models
ArmeiroModel.associate(sequelize.models);
TipoArmaModel.associate(sequelize.models);
ArmaModel.associate(sequelize.models);
MilitarModel.associate(sequelize.models);
AcautelamentoModel.associate(sequelize.models);
BatalhaoModel.associate(sequelize.models);
FabricanteModel.associate(sequelize.models);


//Exportando conexão
module.exports = sequelize;
