/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Captura os erros do request/servidor.
*           
*/


const ApiError = require('./apiError');

function apiErrorHandler(error, requisicao, resposta, next){
    if(error instanceof ApiError){
        resposta.status(error.code).json(error.message);
        return;
    }
    res.status(500).json('Erro interno no servidor');
}

module.exports = apiErrorHandler;