/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Realiza a validação dos parametros da request
*           Envia a request ao model para processo
*/

const {postgresDB} = require('../model/postgres');
const ApiError = require('../error/apiError');
const {regexEmailA, regexEmailB, regexName} = require('../helpers/regex');


class userController {
    //envia requisicao de busca ao model
    get(requisicao, resposta, next){
        try{
            const postgres = new postgresDB();
            let response = postgres.getUsers(requisicao, resposta);
            return response;
        }
        catch(error){
            resposta.status(503).send(error);
        }
    }
    
    //valida campos e envia requisicao de cadastro ao model
    post(requisicao, resposta, next){
        const {user_name, user_email } = requisicao.body;
        
        //name only letters validation
        if (!regexName.test(user_name)){
            next(ApiError.badRequest({
            "erro": true,
            "code": 3141,
            "detail": 'user_name: must be only letters'
            }));
            return;
        }

        //email pattern validation
        if (!regexEmailA.test(user_email) & !regexEmailB.test(user_email)){
            next(ApiError.badRequest({
            "erro": true,
            "code": 1618,
            "detail": 'user_email: must be a valid email pattern'
            }));
            return;
        }
        

        //no body filter
        if(JSON.stringify(requisicao.body)===JSON.stringify({})){
            next(ApiError.badRequest({
                "erro": true,
                "detail": 'Request body not found'
                }));
            return;
        }
        //no name or email filter
        if(!user_name || !user_email){
            next(ApiError.badRequest({
                "erro": true,
                "detail": 'User_name or user_email not found'
                }));
            return;
        }
        try{
            const postgre = new postgresDB();
            const response = postgre.insertUser(requisicao, resposta, next);

            return response;     
        }
        catch(error){
            resposta.status(503).send(error);
        }
    }

    //valida campos e envia requiscao de update ao model    
    put(requisicao, resposta, next){
        const { user_id, user_name, user_email } = requisicao.body;

        //name only letters validation
        if (!regexName.test(user_name)){
            next(ApiError.badRequest({
            "erro": true,
            "code": 3141,
            "detail": 'user_name: must be only letters'
            }));
            return;
        }

        //email pattern validation
        if (!regexEmailA.test(user_email) & !regexEmailB.test(user_email)){
            next(ApiError.badRequest({
            "erro": true,
            "code": 1618,
            "detail": 'user_email: must be a valid email pattern'
            }));
            return;
        }
        
        //no body filter
        if(JSON.stringify(requisicao.body)===JSON.stringify({})){
            next(ApiError.badRequest({
                "erro": true,
                "detail": 'Request body not found'
                }));
            return;
        }
        //no name, email or id filter
        if(!user_name || !user_email || !user_id){
            next(ApiError.badRequest({
                "erro": true,
                "detail": 'User_name, user_email or user_id not found'
                }));
            return;
        }
        try{
            const postgre = new postgresDB();
            const response = postgre.updateUser(requisicao, resposta, next);
            return response;

        }
        catch(error){
            resposta.status(503).send(error);
        }

    }

    //envia requisicao de delete ao model
    delete(requisicao, resposta, next){
        try{
            const postgre = new postgresDB();
            const response = postgre.deleteUser(requisicao, resposta, next);
            return response;
        }
        catch(error){
            resposta.status(503).send(error);
        }
    }
}

module.exports = new userController();