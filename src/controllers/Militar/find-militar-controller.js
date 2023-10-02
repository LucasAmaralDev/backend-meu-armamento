const { BatalhaoModel } = require('../../models/Batalhao-model');
const { MilitarModel } = require('../../models/Militar-model');

class FindMilitarController {
  async find(req, res) {

    try {

      // Buscando todos os militares no banco de dados
      const Militar = await MilitarModel.findAll({
        include: {
          model: BatalhaoModel,
          as: 'batalhaoMilitar',
          attributes: ['nome']
        }
      });

      return res.status(200).json(Militar);

    } catch (error) {

      return res.status(400).json({ error: 'Erro ao buscar militar' })
    }
  }

  async findById(req, res) {

    try {

      // Recuperando o id do militar
      const { id } = req.params;

      // Verifica se o id foi informado
      if (!id) {
        return res.status(400).json({ error: 'Id não informado' })
      }

      // Buscando o militar no banco de dados e fazendo a tratativa de erro
      const militar = await MilitarModel.findByPk(id,{
        include: {
          model: BatalhaoModel,
          as: 'batalhaoMilitar',
          attributes: ['nome']
        }
      });

      if (!militar) {
        return res.status(404).json({ error: 'Militar não encontrado' })
      }

      return res.status(200).json(militar);


    } catch (error) {

    }

  }
}

module.exports = new FindMilitarController();