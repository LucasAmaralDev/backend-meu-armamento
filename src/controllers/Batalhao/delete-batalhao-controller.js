const {BatalhaoModel} = require('../../models/Batalhao-model');
const {MilitarModel} = require('../../models/Militar-model');

class DeleteBatalhaoController{

    async delete(req, res){

        const {id} = req.params;

        //Verificando se o batalhao existe
        const batalhaoExiste = await BatalhaoModel.findOne({
            where: {
                id
            }
        })

        if(!batalhaoExiste){
            return res.status(400).json({
                error: 'Esse Batalhão não existe'
            })
        }

        //Verificando se existe algum milietar vinculado a esse batalhao
        const militarExiste = await MilitarModel.findOne({
            where: {
                batalhao: id
            }
        })

        if(militarExiste){
            return res.status(400).json({
                error: 'Existem militares vinculados a esse batalhão'
            })
        }

        // Deletando o batalhao
        await BatalhaoModel.destroy({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: 'Batalhão deletado com sucesso'
        })

    }


}

module.exports = new DeleteBatalhaoController();