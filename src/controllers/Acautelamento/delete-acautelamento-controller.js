const { AcautelamentoModel } = require("../../models/Acautelamento-model");

class DeleteAcautelamentoModel{

    async delete(req, res){

        try {
            
            // Recuperando o id do acautelamento
            const { id } = req.params;

            // Buscando o acautelamento no banco de dados e fazendo a tratativa de erro
            const acautelamento = await AcautelamentoModel.findByPk(id);

            if(!acautelamento){
                return res.status(400).json({ error: 'Acautelamento não encontrado' })
            }

            if(!acautelamento.dataDevolucao){
                return res.status(400).json({ error: 'Não é possivel excluir um acautelamento não devolvido!' })
            }


            // Deletando o acautelamento
            await AcautelamentoModel.destroy({
                where: {
                    id
                }
            });

            // Retornando uma mensagem de sucesso
            return res.status(200).json({ message: 'Acautelamento deletado com sucesso' })

        } catch (error) {
            
            // Retornando uma mensagem de erro
            return res.status(400).json({ error: 'Erro ao deletar acautelamento' })

        }

    }

}

module.exports = new DeleteAcautelamentoModel();