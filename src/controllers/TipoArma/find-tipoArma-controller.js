const { TipoArmaModel } = require('../../models/TipoArma-model')

class FindTipoArmaController{

    async findAll(req, res){

        const tipos = await TipoArmaModel.findAll();

        return res.status(200).json(tipos);

    }

}

module.exports = new FindTipoArmaController();