const { ArmaModel } = require('../models/Arma-model');
const { AcautelamentoModel } = require('../models/Acautelamento-model')
const { MilitarModel } = require('../models/Militar-model');
const { ArmeiroModel } = require('../models/Armeiro-model');

function quantidadeArmasCadastradas() {
    return ArmaModel.count();
}

function quantidadeArmasAcauteladas() {
    return
}

function quantidadeUsuariosCadastrados() {
    return MilitarModel.count();
}

function quantidadeArmeirosCadastrados() {
    return ArmeiroModel.count();
}

function quantidadeAcautelamentos() {
    return AcautelamentoModel.count();
}

function quantidadeAcautelamentosEmAbertoArmeiro(id) {

    return AcautelamentoModel.count({
        where: {
            armeiro_id: id,
            dataDevolucao: null
        }
    });

}

function quantidadeAcautelamentosPorUsuario(id) {

    return AcautelamentoModel.count({
        where: {
            militar_id: id,
            dataDevolucao: null
        }
    });

}

exports.dashboardServices = {
    quantidadeArmasCadastradas,
    quantidadeArmasAcauteladas,
    quantidadeUsuariosCadastrados,
    quantidadeArmeirosCadastrados,
    quantidadeAcautelamentos,
    quantidadeAcautelamentosEmAbertoArmeiro,
    quantidadeAcautelamentosPorUsuario
}