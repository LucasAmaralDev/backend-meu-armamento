const { MilitarModel } = require('../../models/Militar-model');

class UpdateMilitarController {

    async update(req, res) {

        try {

            // Recuperando o id do militar
            const { id } = req.params;

            // Verifica se o id foi informado
            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })

            }

            // Recuperando os dados do corpo da requisição
            const { registroMilitar, nome, batalhao } = req.body;

            // Verifica se algum dado foi informado
            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            if (!registroMilitar && !nome && !batalhao) {
                return res.status(400).json({ error: 'Nenhum dado informado' })
            }

            if (registroMilitar && typeof registroMilitar !== 'string') {
                return res.status(400).json({ error: 'Registro militar inválido' })
            }

            if (nome && typeof nome !== 'string') {
                return res.status(400).json({ error: 'Nome inválido' })
            }

            if (batalhao && typeof batalhao !== 'string') {
                return res.status(400).json({ error: 'Batalhão inválido' })
            }

            const militar = await MilitarModel.findByPk(id);

            if (!militar) {
                return res.status(404).json({ error: 'Militar não encontrado' })
            }


            const militarAtualizado = await MilitarModel.update({
                registroMilitar,
                nome,
                batalhao
            }, {
                where: {
                    id
                }
            });

            return res.status(200).json({ message: 'Militar atualizado com sucesso' });

        } catch (error) {

        }

    }

}

module.exports = new UpdateMilitarController();