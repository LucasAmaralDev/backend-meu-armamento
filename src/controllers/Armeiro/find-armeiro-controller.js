const { ArmeiroModel } = require('../../models/Armeiro-model');

class FindArmeiroController {

    async findAll(req, res) {

        try {
            const armeiros = await ArmeiroModel.findAll({
                attributes: { exclude: ['senha'] }
            });

            return res.status(200).json(armeiros);

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar armeiros' })

        }

    }

    async findOne(req, res) {

        try {

            // Recuperando o id do armeiro
            const { id } = req.params;

            // Verificando se o id foi informado
            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            // Buscando o armeiro no banco de dados e fazendo a tratativa de erro
            const armeiro = await ArmeiroModel.findOne({
                where: { id },
                attributes: { exclude: ['senha'] }
            });

            if (!armeiro) {
                return res.status(404).json({ error: 'Armeiro não encontrado' })
            }

            // Retornando o armeiro
            return res.status(200).json(armeiro);

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar armeiro' })

        }

    }

    async myInfo(req, res) {

        // Recuperando o id do armeiro
        const { id } = req;

        try {

            // Buscando o armeiro no banco de dados e fazendo a tratativa de erro
            const armeiro = await ArmeiroModel.findOne({ where: { id },
                attributes: { exclude: ['senha'] } });

            if (!armeiro) {
                return res.status(404).json({ error: 'Armeiro não encontrado' })
            }

            // Retornando o armeiro
            return res.status(200).json(armeiro);

        }

        catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar armeiro' })

        }

    }
}

module.exports = new FindArmeiroController();