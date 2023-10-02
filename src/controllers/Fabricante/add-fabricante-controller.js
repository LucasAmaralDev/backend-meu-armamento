const { FabricanteModel } = require('../../models/Fabricante-model');

class AddFabricanteController {
    async novoFabricante(req, res) {

        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ error: 'Dados ausentes' })
        }

        if (typeof nome !== 'string') {
            return res.status(400).json({ error: 'Dados inconsistentes' })
        }

        const fabricanteExiste = await FabricanteModel.findOne({ where: { nome } });

        if (fabricanteExiste) {
            return res.status(400).json({ error: 'Fabricante já cadastrado' })
        }

        const fabricante = await FabricanteModel.create({
            nome
        });

        return res.status(200).json(fabricante);

    }
}

module.exports = new AddFabricanteController();