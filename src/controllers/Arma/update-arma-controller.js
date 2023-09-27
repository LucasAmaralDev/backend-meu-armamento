const { ArmaModel } = require('../../models/Arma-model');
const { AcautelamentoModel } = require('../../models/Acautelamento-model');

class UpdateArmaController {

    async update(req, res) {

        try {

            // Recuperando o id da arma e verificando se ele foi informado
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            // Recebendo os dados da arma e verificando se realmente foram informados
            const { numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao } = req.body;

            if (!numeroSerie && !fabricante && !modelo && !calibre && !capacidadeCarregador && !estadoConservacao && !tipo && !anoFabricacao) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            if (typeof numeroSerie !== 'string' && typeof fabricante !== 'string' && typeof modelo !== 'string' && typeof tipo !== 'string' && typeof calibre !== 'string' && typeof capacidadeCarregador !== 'number' && typeof estadoConservacao !== 'string' && typeof anoFabricacao !== 'number') {
                return res.status(400).json({ error: 'Dados inconsistentes' })
            }

            if (estadoConservacao) {
                if (estadoConservacao !== "NOVO" && estadoConservacao !== "EXELENTE" && estadoConservacao !== "BOM" && estadoConservacao !== "REGULAR" && estadoConservacao !== "BAIXADA") {
                    return res.status(400).json({ error: 'Estado de conservação inválido' })
                }
            }

            if (tipo) {

                if (tipo !== "PISTOLA" && tipo !== "REVOLVER" && tipo !== "ESPINGARDA" && tipo !== "FUZIL" && tipo !== "SUBMETRALHADORA" && tipo !== "CARABINA" && tipo !== "ESCOPETA") {

                    return res.status(400).json({ error: 'Tipo de arma inválido' })

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

            // Atualizando a arma
            await arma.update({ numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao });

            return res.status(200).json({ message: 'Arma atualizada com sucesso' })


        } catch (error) {

            return res.status(400).json({ error: 'Erro ao atualizar arma' })

        }

    }

}

module.exports = new UpdateArmaController();