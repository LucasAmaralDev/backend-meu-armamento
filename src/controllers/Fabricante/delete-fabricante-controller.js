const { ArmaModel } = require('../../models/Arma-model');
const { FabricanteModel } = require('../../models/Fabricante-model');


class DeleteFabricanteModel{

    async delete (req, res) {
            
            const { id } = req.params;
    
            const arma = await ArmaModel.findOne({ where: { fabricante: id } });
    
            if (arma) {
                return res.status(400).json({ error: 'Existem armas cadastradas com esse fabricante' })
            }
    
            const fabricante = await FabricanteModel.destroy({ where: { id } });
    
            return res.status(200).json(fabricante);
    }

}

module.exports = new DeleteFabricanteModel();