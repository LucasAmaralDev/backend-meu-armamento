const { MilitarModel } = require('../../models/Militar-model');
const { AcautelamentoModel } = require('../../models/Acautelamento-model');
const { ArmaModel } = require('../../models/Arma-model');

class CadastrarAcautelamentoController {

    async create(req, res) {

        try {

            //Verificando se recebeu o id do armeiro atravez do middleware
            const { id } = req;
            if (!id) {
                return res.status(400).json({ error: 'Usuário não autenticado' });
            }

            //Verificando se recebeu os dados do usuario e da arma
            const { militar_id, arma_id } = req.body;
            if (!militar_id || !arma_id) {
                return res.status(400).json({ error: 'Dados incompletos' });
            }

            //Verificando se o usuario e a arma existem
            const usuario = await MilitarModel.findByPk(militar_id);
            if (!usuario) {
                return res.status(400).json({ error: 'Usuário não encontrado' });
            }

            const arma = await ArmaModel.findByPk(arma_id);
            if (!arma) {
                return res.status(400).json({ error: 'Arma não encontrada' });
            }

            if (arma.dataValues.estadoConservacao === "BAIXADA") {
                return res.status(400).json({ error: 'Arma baixada, não é possivel acautela-la' });
            }

            //Verificando se a arma já está acautelada
            const armaEstaAcautelada = await AcautelamentoModel.findAll({
                where: {
                    arma_id
                }
            });

            const verificaAcautelamento = armaEstaAcautelada.some(acautelamento => {
                if (acautelamento.dataValues.dataDevolucao === null) {
                    return true
                }
            })

            if (verificaAcautelamento) {
                return res.status(400).json({ error: 'Arma já acautelada' });
            }

            // Criando o acautelamento
            const acautelamento = await AcautelamentoModel.create({
                militar_id,
                arma_id,
                armeiro_id: id,
                dataAcautelamento: new Date().toISOString().split('T')[0],
            })
            if (!acautelamento) {
                return res.status(400).json({ error: 'Erro ao acautelar arma' });
            }

            // Defininido a arma como em uso
            const armaAtualizada = await ArmaModel.update({
                emUso: true
            }, {
                where: {
                    id: arma_id
                }
            })

            if (!armaAtualizada) {
                acautelamento.destroy();
                return res.status(400).json({ error: 'Erro ao atualizar arma' });
            }

            //Atualizando o status da arma
            return res.status(200).json(acautelamento);


        }

        catch (error) {

            return res.status(500).json({ error: 'Erro interno no servidor' });

        }

    }

}


module.exports = new CadastrarAcautelamentoController();