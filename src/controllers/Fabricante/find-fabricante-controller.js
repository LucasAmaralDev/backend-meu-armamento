const { FabricanteModel } = require('../../models/Fabricante-model');


class FindFabricanteController {
    async findAll (req, res) {
            
            const fabricantes = await FabricanteModel.findAll();
    
            return res.status(200).json(fabricantes);
    
        }
}

module.exports = new FindFabricanteController();