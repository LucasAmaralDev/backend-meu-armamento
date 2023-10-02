const { TipoArmaModel } = require('../../models/TipoArma-model')

class DeleteTipoArmaController{
    
        async delete(req, res){
    
            try {
    
                const { id } = req.params;
    
                if (!id){
                    return res.status(400).json({ error: 'Id não informado' })
                }
    
                const tipoArmaExiste = await TipoArmaModel.findByPk(id);
    
                if (!tipoArmaExiste){
                    return res.status(400).json({ error: 'Tipo de arma não existe' })
                }
    
                const tipoArmaDeletado = await TipoArmaModel.destroy({
                    where: {
                        id
                    }
                })
    
                return res.status(200).json(tipoArmaDeletado)
    
            } catch (error) {
                
                return res.status(400).json({ error: error })
    
            }
        }
    }

module.exports = new DeleteTipoArmaController();