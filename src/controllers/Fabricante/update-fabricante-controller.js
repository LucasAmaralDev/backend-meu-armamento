const { FabricanteModel } = require('../../models/Fabricante-model');

class UpdateFabricanteController {

    async update( req, res ) {

        const { id } = req.params;
        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'Dados ausentes' })
        }

        if (typeof nome !== 'string') {
            return res.status(400).json({ error: 'Dados inconsistentes' })
        }

        const fabricanteExiste = await FabricanteModel.findOne({ where: { nome } });

        if (fabricanteExiste) {
            return res.status(400).json({ error: 'Já existe um fabricante com esse nome' })
        }

        const fabricante = await FabricanteModel.update({
            nome
        }, {
            where: {
                id
            }
        });

        return res.status(200).json(fabricante);

    }

}

module.exports = new UpdateFabricanteController();