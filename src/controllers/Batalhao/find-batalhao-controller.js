const {BatalhaoModel} = require('../../models/Batalhao-model');

class FindBatalhaoModel{

    async findAll(req, res){

        const batalhoes = await BatalhaoModel.findAll();

        return res.status(200).json(batalhoes);

    }

}

module.exports = new FindBatalhaoModel();