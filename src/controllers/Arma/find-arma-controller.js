const { ArmaModel } = require('../../models/Arma-model');
const { ArmeiroModel } = require('../../models/Armeiro-model');

class FindArmaController {

    async findAll(req, res) {

        try {

            const armas = await ArmaModel.findAll({
                include: {
                    model: ArmeiroModel,
                    as: 'armeiro',
                    attributes: ['nome']
                }
            })

            if (!armas) {
                return res.status(404).json({ error: 'Nenhuma arma encontrada' })
            }

            return res.status(200).json(armas)
            
        } catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar armas' })

            
        }
        
    }

    async findOne(req, res) {

        try {

            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            const arma = await ArmaModel.findByPk(id, {
                include: {
                    model: ArmeiroModel,
                    as: 'armeiro',
                    attributes: ['nome']
                }
            });

            if (!arma) {
                return res.status(404).json({ error: 'Arma não encontrada' })
            }

            return res.status(200).json(arma)

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao buscar arma' })

        }
    }

}

module.exports = new FindArmaController();