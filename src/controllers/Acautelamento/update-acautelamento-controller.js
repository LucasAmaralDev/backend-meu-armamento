const { AcautelamentoModel } = require("../../models/Acautelamento-model");
const { ArmaModel } = require('../../models/Arma-model');

class UpdateAcautelamentoController {

    async devolucao(req, res) {

        try {

            // Recuperando o id do acautelamento
            const { id } = req.params;

            // Gerando a data atual para a devolução
            const dataDevolucao = new Date().toISOString().split('T')[0];

            // Procurando o acautelamento no banco de dados pelo id
            const acautelamento = await AcautelamentoModel.findByPk(id);

            // Caso não encontre retorna errro
            if (!acautelamento) {
                return res.status(400).json({ error: 'Acautelamento não encontrado' })
            }

            // Caso a arma já tenha sido devolvida retorna erro
            if (acautelamento.dataDevolucao) {
                return res.status(400).json({ error: 'Arma já devolvida' })
            }

            // Caso a data de devolução não tenha sido informada retorna erro
            if (!dataDevolucao) {
                return res.status(400).json({ error: 'Data de devolução não informada' })
            }

            // Atualizando o acautelamento com a data de devolução
            await AcautelamentoModel.update({
                dataDevolucao
            }, {
                where: {
                    id
                }
            });
    
            // Removendo o status de em uso da arma
            await ArmaModel.update({
                emUso: false
            }, {
                where: {
                    id: acautelamento.arma_id
                }
            });


            
            return res.status(200).json({ message: 'Arma devolvida com sucesso' })

        } catch (error) {

            return res.status(500).json({ error: 'Erro interno ao devolver arma' })

        }

    }

    async update(req, res) {

        try {

            // Recuperando o id do acautelamento
            const { id } = req.params;

            // Verificando se o id do acautelamento foi informado
            if (!id) {
                return res.status(400).json({ error: 'Id do acautelamento não informado' })
            }

            // Recebendo os dados de acautelamento e verificando se realmente foram informados
            const { usuario_id, arma_id, dataAcautelamento, dataDevolucao } = req.body;

            if (!usuario_id && !arma_id && !dataAcautelamento && !dataDevolucao) {
                return res.status(400).json({ error: 'Dados do acautelamento não informados' })
            }

            // Procurando o acautelamento no banco de dados pelo id
            const acautelamento = await AcautelamentoModel.findByPk(id);

            // Caso não encontre retorna errro
            if (!acautelamento) {
                return res.status(400).json({ error: 'Acautelamento não encontrado' })
            }

            // Caso a arma nap tenha sido devolvida retornar errro
            if (!acautelamento.dataDevolucao) {
                return res.status(400).json({ error: 'A arma deve ser devolvida antes de poder ser editado o acautelamento!' })
            }


            // Atualizando o acautelamento
            await AcautelamentoModel.update({
                usuario_id,
                arma_id,
                dataAcautelamento,
                dataDevolucao
            }, {
                where: {
                    id
                }
            });

            // Retornando uma mensagem de sucesso
            return res.status(200).json({ message: 'Acautelamento atualizado com sucesso' })

        } catch (error) {

            // Retornando uma mensagem de erro
            return res.status(500).json({ error: 'Erro interno ao atualizar acautelamento' })

        }

    }

}

module.exports = new UpdateAcautelamentoController();