const { ArmeiroModel } = require('../../models/Armeiro-model');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

class LoginArmeiroController {

    async login(req, res) {

        try {

            const { registroMilitar, senha } = req.body;

            //Verificando se os dados foram recebidos
            if (!registroMilitar || !senha) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se o armeiro já foi registrado
            const armeiro = await ArmeiroModel.findOne({ where: { registroMilitar } });

            if (!armeiro) {
                return res.status(400).json({ error: 'Armeiro não cadastrado' })
            }

            // Verificando se a senha é válida, se não for retorna erro
            const senhaValida = await bcrypt.compare(senha, armeiro.senha);

            if (!senhaValida) {
                return res.status(400).json({ error: 'Login ou senha incorretos' })
            }

            //Criando token
            const token = jwt.sign({
                id: armeiro.id,
            },
                process.env.SECRET_TOKEN,
                {
                    expiresIn: process.env.TOKEN_EXPIRES_IN
                }
            )

            return res.status(200).json({ token });

        } catch (error) {

            return res.status(500).json({ error: 'Erro interno do servidor' })

        }

    }

}

module.exports = new LoginArmeiroController();