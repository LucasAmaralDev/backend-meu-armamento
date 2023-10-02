const { ArmaModel } = require('../../models/Arma-model');
const { FabricanteModel } = require('../../models/Fabricante-model')
const { TipoArmaModel } = require('../../models/TipoArma-model')

class AddArmaController {

    async add(req, res) {

        try {
            // Recuperando o id do armeiro
            const { id } = req;

            const armeiro_id = id;

            // Recebendo os dados da arma para cadastro
            const { numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao} = req.body;
            console.log(numeroSerie, fabricante, modelo, calibre, capacidadeCarregador, estadoConservacao, tipo, anoFabricacao)
            console.log(armeiro_id)
            //Verificando se os dados foram recebidos
            if (!numeroSerie || !fabricante || !modelo || !calibre || !capacidadeCarregador || !estadoConservacao || !tipo || !anoFabricacao || !armeiro_id ) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se o tipo da existe
            const tipoArmaExiste = await TipoArmaModel.findOne({
                where: {
                    id: tipo
                }
            })

            if (!tipoArmaExiste) {
                return res.status(400).json({
                    error: 'Tipo de Arma não cadastrado no banco de dados'
                })
            }

            //Verificando se o fabricante existe
            const fabricanteExiste = await FabricanteModel.findAll({
                where: {
                    id: fabricante
                }
            })

            if (!fabricanteExiste){
                return res.status(400).json({
                    error: "Fabricante não cadastrado"
                })
            }

            //Verificando se o estado de conservação é valido
            if (estadoConservacao !== "NOVO" && estadoConservacao !== "EXCELENTE" && estadoConservacao !== "BOM" && estadoConservacao !== "REGULAR" && estadoConservacao !== "BAIXADA") {
                return res.status(400).json({ error: 'Estado de conservação inválido' })
            }

            //Verificando se o ano de fabricação é valido
            if (anoFabricacao > new Date().getFullYear()) {
                return res.status(400).json({ error: 'Ano de fabricação inválido' })
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
                tipo: Number(tipo),
                emUso: false,
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
