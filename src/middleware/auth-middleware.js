const jwt = require('jsonwebtoken');
require('dotenv').config();
const { ArmeiroModel } = require('../models/Armeiro-model');

function authMiddleware(req, res, next){

    const token = req.headers['authorization'];

    if(!token){
        return res.status(401).json({error: 'Token não encontrado'});
    }

    else {

        // Separando o token do Bearer
        const accessToken = token.split(' ')[1];

        // Verificando se o token é válido
        jwt.verify(
            accessToken,
            process.env.SECRET_TOKEN,
            (error, dados) => {

                // Se o token não for válido, retorna um erro
                if (error) {
                    return res.status(401).json({error: 'Token inválido'});
                }

                // Verificando se o id do armeiro existe
                const armeiro = ArmeiroModel.findOne({
                    where: {
                        id: dados.id
                    }
                });

                if(!armeiro){
                    return res.status(404).json({error: 'Dados do armeiro não encontrado no banco de dados, faça login novamente'});
                }

                req.id = dados.id;
                console.log(req.id)
                next();

            }
        )

    }

}

module.exports = {authMiddleware};