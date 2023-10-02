const { TipoArmaModel } = require('../../models/TipoArma-model')

class UpdateTipoArmaController{

    async update(req, res){

        try {

            const { id } = req.params;

            if (!id){
                return res.status(400).json({ error: 'Id não informado' })
            }

            const { tipo } = req.body;

            if (!tipo){
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            const tipoArmaExiste = await TipoArmaModel.findByPk(id);

            if (!tipoArmaExiste){
                return res.status(400).json({ error: 'Tipo de arma não existe' })
            }

            const tipoArmaAtualizado = await TipoArmaModel.update({
                tipo
            }, {
                where: {
                    id
                }
            })

            return res.status(200).json(tipoArmaAtualizado)

        } catch (error) {
            
            return res.status(400).json({ error: error })

        }


    }

}

module.exports = new UpdateTipoArmaController();