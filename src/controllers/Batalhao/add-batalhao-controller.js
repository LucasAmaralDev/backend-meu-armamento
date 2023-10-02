const {BatalhaoModel} = require('../../models/Batalhao-model');

class AddBatalhaoModel {

    async novoBatalhao(req, res) {

        const {nome} = req.body;

        if (!nome) {

            return res.status(400).json({
                error: 'Dados Ausentes'
            })

        }

        const batalhaoExiste = await BatalhaoModel.findOne({
            where: {
                nome
            }
        })

        if (batalhaoExiste) {
            return res.status(400).json({
                error: 'Esse Batalhão já existe'
            })
        }

        const novoBatalhao = await BatalhaoModel.create({
            nome
        })

        return res.json(novoBatalhao)

    }

}

module.exports = new AddBatalhaoModel();