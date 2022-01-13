/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Cria as rotas de usuário.
*           
*/
const userController = require('../controller/userController');

module.exports = function(app) {

    //rota retorna usuário
    app.get('/user', userController.get);

    //rota cadastra usuário
    app.post('/user', userController.post)

    //rota login usuário
    app.get('/login', userController.getLogin)
    app.get('/login/:email/:senha', userController.login)

    //rota atualiza usuário
    app.put('/user/:user_id', userController.put);

    //rota remove usuário
    app.delete('/user/:user_id', userController.delete);
    
};