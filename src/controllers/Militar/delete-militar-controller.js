const { MilitarModel } = require('../../models/Militar-model');
const { AcautelamentoModel } = require('../../models/Acautelamento-model');
const { Op } = require('sequelize');

class DeleteMilitarModel {

    async delete(req, res) {

        try {

            // Recebemdp o id do militar
            const { id } = req.params;

            // Verificando se o id foi informado
            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            // Buscando o militar no banco de dados e fazendo a tratativa de erro
            const militar = await MilitarModel.findByPk(id);


            if (!militar) {
                return res.status(404).json({ error: 'Militar não encontrado' })
            }

            // Verificando se o militar possui acautelamentos em aberto
            const acautelamentos = await AcautelamentoModel.findAll({
                where: {
                    militar_id: id,
                }
            });

            const verificaAcautelamento = acautelamentos.some(acautelamento => {

                if (acautelamento.dataValues.dataDevolucao === null) {
                    return true
                }

            })

            // Se o militar possuir acautelamentos em aberto, não é possivel exclui-lo
            if (verificaAcautelamento) {
                return res.status(400).json({ error: 'Militar possui acautelamentos em aberto, não é possivel exclui-lo!' })
            }

            // Deletando o militar
            await MilitarModel.destroy({
                where: {
                    id
                }
            });

            // Retornando uma mensagem de sucesso
            return res.status(200).json({ message: 'Militar deletado com sucesso' })

        } catch (error) {

            // Retornando uma mensagem de erro
            return res.status(400).json({ error: 'Erro ao deletar militar' })

        }

    }

}

module.exports = new DeleteMilitarModel();