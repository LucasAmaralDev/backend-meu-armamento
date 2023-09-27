const { ArmeiroModel } = require('../../models/Armeiro-model');

class DeleteArmeiroController {

    async delete(req, res) {

        try {

            // Recuperando o id do armeiro
            const { id } = req.params;


            // Buscando o armeiro no banco de dados e fazendo a tratativa de erro
            const armeiro = await ArmeiroModel.findByPk(id);

            if (!armeiro) {
                return res.status(404).json({ error: 'Armeiro não encontrado' })
            }

            // Deletando o armeiro
            await armeiro.destroy();

            return res.status(200).json({ message: 'Armeiro deletado com sucesso' })

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao deletar armeiro' })

        }

    }


}

module.exports = new DeleteArmeiroController();