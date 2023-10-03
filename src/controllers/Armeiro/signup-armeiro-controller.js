const { ArmeiroModel } = require('../../models/Armeiro-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class SignupArmeiroController {

    async signup(req, res) {

        try {

            const { nome, registroMilitar, senha, email } = req.body;

            //Verificando se os dados foram recebidos
            if (!nome || !registroMilitar || !senha) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se a senha possui mais de 6 digitos
            if (senha.length < 6) {
                return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' })
            }

            //Verificando se o nome possui caracteres especiais usando regex
            if (nome.match(/[\d!@#$%^&*()_+={};':"\\|,.<>?]/g)) {
                return res.status(400).json({ error: 'Nome inválido' })
            }

            //Verificando se a senha é minimamente forte usando regex
            if (!senha.match(/[a-z]/g) || !senha.match(/[A-Z]/g || !senha.match(/[0-9]/g))) {
                return res.status(400).json({ error: 'Senha deve conter caracteres maiusculos, minusculos e ao menos um numero' })
            }

            //Verificando se o armeiro já foi registrado
            const armeiroExiste = await ArmeiroModel.findOne({ where: { registroMilitar } });
            if (armeiroExiste) {
                return res.status(400).json({ error: 'Armeiro já cadastrado' })
            }

            //Criptografando senha
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hash(senha, salt);

            //Criando armeiro
            const armeiro = await ArmeiroModel.create({ nome, registroMilitar, senha: senhaCriptografada, email });

            if (armeiro) {
                const token = jwt.sign({
                    id: armeiro.id,
                },
                    process.env.SECRET_TOKEN,
                    {
                        expiresIn: process.env.TOKEN_EXPIRES_IN
                    }
                )

                return res.status(201).json({ token });
            }

            else {
                return res.status(400).json({ error: 'Erro ao criar armeiro' })
            }

        } catch (error) {

            //Retornando erro
            return res.status(400).json({ error: 'Erro ao criar armeiro' })

        }

    }

}

module.exports = new SignupArmeiroController();
