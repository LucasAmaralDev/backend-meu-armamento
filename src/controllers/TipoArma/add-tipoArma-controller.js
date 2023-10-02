const { TipoArmaModel } = require('../../models/TipoArma-model')

class AddTipoArmaModel {

    async novoTipo(req, res) {

        const { tipo } = req.body;

        if (!tipo) {

            return res.status(400).json({
                error: 'Dados Ausentes'
            })

        }

        const tipoArmaExiste = await TipoArmaModel.findOne({
            where: {
                tipo
            }
        })

        if (tipoArmaExiste) {
            return res.status(400).json({
                error: 'Esse tipo de Arma já existe'
            })
        }

        const novoTipo = await TipoArmaModel.create({
            tipo
        })

        return res.json(novoTipo)

    }


}

module.exports = new AddTipoArmaModel();