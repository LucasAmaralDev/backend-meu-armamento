const { ArmaModel } = require('../../models/Arma-model');
const { TipoArmaModel } = require('../../models/TipoArma-model');

class ArmasRelatorioController{

    async armasPorTipo(req, res){

        try {

            const tiposDeArmas = await TipoArmaModel.findAll()

            const armasPorTipo = []

            for (const tipodearma of tiposDeArmas) {

                const armas = await ArmaModel.findAll({
                    where: {
                        tipo: tipodearma.id
                    },
                    attributes: ['id']
                })

                armasPorTipo.push({tipo: tipodearma.tipo, total: armas.length})

            }

            return res.status(200).json(armasPorTipo)

        } catch (error) {
            
            return res.status(400).json({ error: error })

        }

    }

    async armasPorAno(req, res){
            
            try {
    
                const armasPorAno = await ArmaModel.findAll({
                    attributes: [[ArmaModel.sequelize.fn('YEAR', ArmaModel.sequelize.col('createdAt')), 'ano'], [ArmaModel.sequelize.fn('COUNT', ArmaModel.sequelize.col('id')), 'total']],
                    group: [[ArmaModel.sequelize.fn('YEAR', ArmaModel.sequelize.col('createdAt'))]],
                })
    
                return res.status(200).json(armasPorAno)
    
            } catch (error) {
                
                return res.status(400).json({ error: error })
    
            }
    
        }


    async armasPorEstadoConservacao(req, res){
            
            try {
    
                const armasPorEstadoConservacao = await ArmaModel.findAll({
                    attributes: ['estadoConservacao', [ArmaModel.sequelize.fn('COUNT', ArmaModel.sequelize.col('estadoConservacao')), 'total']],
                    group: ['estadoConservacao']
                })
    
                return res.status(200).json(armasPorEstadoConservacao)
    
            } catch (error) {
                
                return res.status(400).json({ error: error })
    
            }
    
    }

}

module.exports = new ArmasRelatorioController();