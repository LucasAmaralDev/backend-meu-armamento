const { ArmaModel } = require('../../models/Arma-model');
const { AcautelamentoModel } = require('../../models/Acautelamento-model');
const { TipoArmaModel } = require('../../models/TipoArma-model');
const { FabricanteModel } = require('../../models/Fabricante-model');

class UpdateArmaController {

    async update(req, res) {

        try {

            // Recuperando o id da arma e verificando se ele foi informado
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            // Recebendo os dados da arma e verificando se realmente foram informados
            const { numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, emUso, tipo, anoFabricacao } = req.body;

            if (!numeroSerie && !fabricante && !modelo && !calibre && !capacidadeCarregador && !estadoConservacao && !tipo && !anoFabricacao && !emUso) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            if (estadoConservacao) {
                if (estadoConservacao !== "NOVO" && estadoConservacao !== "EXCELENTE" && estadoConservacao !== "BOM" && estadoConservacao !== "REGULAR" && estadoConservacao !== "BAIXADA") {
                    return res.status(400).json({ error: 'Estado de conservação inválido' })
                }
            }

            //Verificando se o tipo da existe
            if (tipo) {

                const tipoExiste = await TipoArmaModel.findOne({
                    where: {
                        id: tipo
                    }
                })
                
                if (!tipoExiste) {
                    return res.status(400).json({ error: 'Tipo de arma não cadastrado' })
                }
            }

            // Verificando se o fabricante existe
            if (fabricante){

                const fabricanteExiste = await FabricanteModel.findOne({
                    where: {
                        id: fabricante
                    }
                })

                if (!fabricanteExiste) {
                    return res.status(400).json({
                        error: 'Fabricante não existe'
                    })
                }

            }

            if (anoFabricacao && anoFabricacao > new Date().getFullYear()) {
                return res.status(400).json({ error: 'Ano de fabricação inválido' })
            }

            //verificando se a arma está acautelada
            const acautelamento = await AcautelamentoModel.findAll({
                where: {
                    arma_id: id
                }
            })


            const verificarAcautelamento = acautelamento.some(acautelamento => {

                    if (acautelamento.dataValues.dataDevolucao === null) {
                        return true
                    }
    
                })

            if (verificarAcautelamento) {
                return res.status(400).json({ error: 'Arma acautelada, não é possivel atualiza-la' })
            }

            // Buscando a arma no banco de dados e fazendo a tratativa de erro
            const arma = await ArmaModel.findByPk(id);

            if (!arma) {
                return res.status(404).json({ error: 'Arma não encontrada' })
            }

            // verificando se em uso esta marcado true
            if (arma.emUso === true) {
                return res.status(400).json({ error: 'Arma em uso, não é possivel atualiza-la' })
            }

            // Atualizando a arma
            await arma.update({ numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao });

            return res.status(200).json({ message: 'Arma atualizada com sucesso' })


        } catch (error) {

            return res.status(400).json({ error: 'Erro ao atualizar arma' })

        }

    }

}

module.exports = new UpdateArmaController();