const { ArmeiroModel } = require('../../models/Armeiro-model');
const bcrypt = require('bcrypt');

class UpdateArmeiroController {

    async update(req, res) {

        try {

            //recebe o id do armeiro a ser atualizado pela url
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            //recebe os dados a serem atualizados pelo body
            const { nome, email, registroMilitar, fotoPerfil } = req.body;

            if (!nome && !email && !registroMilitar && !fotoPerfil) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se o nome possui caracteres especiais usando regex
            if (nome && nome.match(/[\d!@#$%^&*()_+={};':"\\|,.<>?]/g)) {
                return res.status(400).json({ error: 'Nome inválido' })
            }

            //Verificando se o email é válido
            if (email && !email.includes('@')) {
                return res.status(400).json({ error: 'Email inválido' })
            }

            //Verificando se o armeiro já foi registrado
            const armeiro = await ArmeiroModel.findByPk(id);

            if (!armeiro) {
                return res.status(404).json({ error: 'Armeiro não encontrado' })
            }
            if (nome.length > 0 && email.length > 0) {
                await armeiro.update({ nome, email, registroMilitar, fotoPerfil });
            } else if (nome.length > 0) {
                await armeiro.update({ nome, email: armeiro.email, registroMilitar, fotoPerfil });
            }
            else {
                await armeiro.update({ nome: armeiro.nome, email, registroMilitar, fotoPerfil });
            }
            //Atualizando armeiro


            return res.status(200).json({ message: 'Armeiro atualizado com sucesso' })

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao atualizar armeiro' })

        }

    }


    async updatePassword(req, res) {

        try {

            //recebe o id do armeiro a ser atualizado pela url
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Id não informado' })
            }

            //recebe os dados a serem atualizados pelo body
            const { senha, novaSenha } = req.body;

            if (!senha || !novaSenha) {
                return res.status(400).json({ error: 'Dados ausentes' })
            }

            //Verificando se a senha possui mais de 6 digitos
            if (novaSenha.length < 6) {
                return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' })
            }

            //Verificando se a senha é minimamente forte usando regex
            if (!novaSenha.match(/[a-z]/g) || !novaSenha.match(/[A-Z]/g || !novaSenha.match(/[0-9]/g))) {
                return res.status(400).json({ error: 'Senha deve conter caracteres maiusculos, minusculos e ao menos um numero' })
            }

            //Verificando se o armeiro já foi registrado
            const armeiro = await ArmeiroModel.findByPk(id);

            if (!armeiro) {
                return res.status(404).json({ error: 'Armeiro não encontrado' })
            }

            //Verificando se a senha está correta
            const senhaCorreta = await bcrypt.compare(senha, armeiro.senha);

            if (!senhaCorreta) {
                return res.status(400).json({ error: 'Senha incorreta' })
            }

            //Criptografando senha
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hash(novaSenha, salt);

            //Atualizando armeiro
            await armeiro.update({ senha: senhaCriptografada });

            return res.status(200).json({ message: 'Senha atualizada com sucesso' })

        } catch (error) {

            return res.status(400).json({ error: 'Erro ao atualizar senha' })

        }

    }

}

module.exports = new UpdateArmeiroController();