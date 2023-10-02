const { BatalhaoModel } = require('../../models/Batalhao-model');

class UpdateBatalhaoModel {

    async update(req, res) {

        const { id } = req.params;
        const { nome } = req.body;

        if (!nome) {

            return res.status(400).json({
                error: 'Dados Ausentes'
            })

        }

        //Verificando se o batalhao existe
        const batalhaoExiste = await BatalhaoModel.findOne({
            where: {
                id
            }
        })

        if (!batalhaoExiste) {
            return res.status(400).json({
                error: 'Esse Batalhão não existe'
            })
        }

        //Verificando se ja existe batalhao com esse nome
        const batalhaoNomeExiste = await BatalhaoModel.findOne({
            where: {
                nome
            }
        })

        if (batalhaoNomeExiste) {
            return res.status(400).json({
                error: 'Esse Batalhão já existe'
            })
        }

        const novoBatalhao = await BatalhaoModel.update({
            nome
        }, {
            where: {
                id
            }
        })

        return res.json(novoBatalhao)

    }

}

module.exports = new UpdateBatalhaoModel();