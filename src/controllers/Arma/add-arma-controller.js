		const { ArmaModel } = require('../../models/Arma-model');

class AddArmaController {

    async add(req, res) {

        try {
            // Recuperando o id do armeiro
            const { id } = req;

            const armeiro_id = id;

            // Recebendo os dados da arma para cadastro
            const { numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao } = req.body;

            //Verificando se os dados foram recebidos
            if (!numeroSerie || !fabricante || !modelo || !calibre || !capacidadeCarregador || !estadoConservacao || !tipo || !anoFabricacao || !armeiro_id) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se o tipo da arma é valido
            if (tipo !== "PISTOLA" && tipo !== "REVOLVER" && tipo !== "ESPINGARDA" && tipo !== "FUZIL" && tipo !== "SUBMETRALHADORA" && tipo !== "CARABINA" && tipo !== "ESCOPETA") {
                return res.status(400).json({ error: 'Tipo de arma inválido' })
            }

            //Verificando se o estado de conservação é valido
            if (estadoConservacao !== "NOVO" && estadoConservacao !== "EXELENTE" && estadoConservacao !== "BOM" && estadoConservacao !== "REGULAR" && estadoConservacao !== "BAIXADA"){
                    return res.status(400).json({ error: 'Estado de conservação inválido' })
                }

            //Verificando se o ano de fabricação é valido
            if (anoFabricacao > new Date().getFullYear()){
                return res.status(400).json({ error: 'Ano de fabricação inválido' })
            }


            //Verificando se os dados são consistentes
            if (typeof numeroSerie !== 'string' || typeof fabricante !== 'string' || typeof modelo !== 'string' || typeof tipo !== 'string' || typeof calibre !== 'string' || typeof capacidadeCarregador !== 'number' || typeof estadoConservacao !== 'string' || typeof anoFabricacao !== 'number' || typeof armeiro_id !== 'number') {
                return res.status(400).json({ error: 'Dados inconsistentes' })
            }

            //Verificando se o numero de série já foi registrado
            const armaExiste = await ArmaModel.findOne({ where: { numeroSerie } });

            if (armaExiste) {
                return res.status(400).json({ error: 'Arma já cadastrada' })
            }

            //Criando arma
            const arma = await ArmaModel.create({
                numeroSerie,
                fabricante,
                modelo,
                calibre,
                capacidadeCarregador,
                estadoConservacao,
                tipo,
                anoFabricacao,
                armeiro_id,
                dataCadastro: new Date().toISOString().split('T')[0]
            })


            return res.status(200).json({ message: 'Arma adicionada com sucesso' })

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao adicionar arma' })

        }

    }
}

module.exports = new AddArmaController();
