const { ArmaModel } = require('../../models/Arma-model');
const { AcautelamentoModel } = require('../../models/Acautelamento-model');

class DeleteArmaController {

    async delete(req, res) {

        try {

            // Recebendo o id e verificando se ele foi informado
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            // Buscando a arma no banco de dados e fazendo a tratativa de erro
            const arma = await ArmaModel.findByPk(id);

            if (!arma) {
                return res.status(404).json({ error: 'Arma não encontrada' })
            }

            // Verificando se a arma possui acautelamentos
            const acautelamento = await AcautelamentoModel.findAll({
                where: {
                    arma_id: id
                }
            })

            if (acautelamento.length > 0) {
                return res.status(400).json({ error: 'Não é possivel excluir uma arma que possui acautelamentos, por favor marque o estado da arma como BAIXADA' })
            }

            // Deletando a arma
            await arma.destroy();

            return res.status(200).json({ message: 'Arma deletada com sucesso' })

        } catch (error) {


            return res.status(500).json({ error: 'Erro ao deletar arma' })

        }


    }

}

module.exports = new DeleteArmaController();