const { MilitarModel } = require('../../models/Militar-model');


class AddMilitarController {

    async add(req, res) {

        try {

            const { id } = req;

            const armeiro_id = id;
            const { registroMilitar, nome, batalhao } = req.body;

            //Verificando se os dados foram recebidos
            if (!registroMilitar || !nome || !batalhao || !armeiro_id) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se os dados são consistentes
            if (typeof registroMilitar !== 'string' || typeof nome !== 'string' || typeof batalhao !== 'string' || typeof armeiro_id !== 'number') {
                return res.status(400).json({ error: 'Dados inconsistentes' })
            }

            //Verificando se o registro militar já foi registrado
            const militarExiste = await MilitarModel.findOne({ where: { registroMilitar } });

            if (militarExiste) {
                return res.status(400).json({ error: 'Usuário já cadastrado' })
            }

            //Criando usuário
            const militar = await MilitarModel.create({
                registroMilitar,
                nome,
                batalhao,
                dataCadastro: new Date().toISOString().split('T')[0],
                armeiro_id
            })

            return res.status(200).json(militar)

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao cadastrar militar' })

        }

    }


}

module.exports = new AddMilitarController();