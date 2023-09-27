const { AcautelamentoModel } = require("../../models/Acautelamento-model");

class FindAcautelamentoController {

    async findAll(req, res) {

        try {

            // Buscando todos os acautelamentos no banco de dados e fazendo a tratativa de erro
            const Acautelamentos = await AcautelamentoModel.findAll({
                include: [
                    {
                        association: 'militar',
                        attributes: ['registroMilitar','nome']
                    },{
                        association: 'arma',
                        attributes: ['numeroSerie','modelo']
                    },{
                        association: 'armeiro',
                        attributes: ['nome']
                    }
                ]
            });

            if (!Acautelamentos) {
                return res.status(400).json({ error: 'Erro ao buscar acautelamentos' })
            }

            // Retornando os acautelamentos
            return res.status(200).json(Acautelamentos)

        } catch (error) {

            return res.status(500).json({ error: 'Erro interno ao buscar acautelamentos' })

        }

    }

    async findOne(req, res) {


        try {

            // Recuperando o id do acautelamento
            const { id } = req.params;

            // Buscando o acautelamento no banco de dados e fazendo a tratativa de erro
            const Acautelamento = await AcautelamentoModel.findByPk(id);

            if (!Acautelamento) {
                return res.status(400).json({ error: 'Nenhum acautelamento encontrado' })
            }

            // Retornando o acautelamento
            return res.status(200).json(Acautelamento)


        } catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar acautelamento' })

        }

    }

}

module.exports = new FindAcautelamentoController();