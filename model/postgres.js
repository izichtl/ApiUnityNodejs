/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Realiza a conexão com Postgres
*           Envia as solicitações ao Postgres
*/
const { Pool } = require("pg");
const ApiError = require('../error/apiError');

function postgresDB(){
    this.postGresUrl = {
        connectionString: process.env.POSTGRES_URL
    }

}
//retorna todos os usuários
postgresDB.prototype.getUsers = async function(requisicao, resposta){
    const pool = new Pool(this.postGresUrl);
    try{
        const allUsers = await pool.query("SELECT * FROM users ORDER BY user_id");
        resposta.status(200).send(allUsers.rows)
    }
    catch(error){
        resposta.status(400).send(error)
    }
    pool.end();
}

postgresDB.prototype.getAllUsers = async function(requisicao, resposta){
    const pool = new Pool(this.postGresUrl);
    try{
        const allUsers = await pool.query("SELECT * FROM users ORDER BY user_id");
        console.log(allUsers.rows);
        let stringResponse = '';
        allUsers.rows.forEach( (e)=> {
            const trecho = `\n${e.user_name} ${e.user_email}\n Senha: ${e.user_pass}\n
            ` 
            stringResponse = stringResponse + trecho

        })
        
        
        
        resposta.status(200).send(stringResponse)


    }
    catch(error){
        resposta.status(400).send(error)
    }
    pool.end();
}

postgresDB.prototype.loginUser = async function(requisicao, resposta, next){
    const pool = new Pool(this.postGresUrl);
    try{
        const {
            email,
            senha,
        } = requisicao.params;
        console.log(email)
        console.log(senha)
        const allUsers = await pool.query("SELECT * FROM users WHERE user_email = $1",
        [email]);
        console.log(allUsers.rows);
        if (allUsers.rows[0]) {
            console.log('User-Cadastrado');
            if (allUsers.rows[0].user_pass === senha) {
                // console.log(allUsers.rows[0].user_senha);
                console.log('Senha-Validada');
            } else {
                next(ApiError.databaseError({
                    "error": '__Senha incorreta__',
                }));
            }
            resposta.status(200).send("1")
        } else {
            next(ApiError.databaseError({
                "error": '__Usuário não cadastrado__',
            }));
            return;
        }
        // resposta.status(400).send("NOT FOUND");
    }
    catch(error){
        next(ApiError.databaseError({
            "erro": true,
            "code": error.code,
            "detail": error.detail
        }));
        return;
    }
    pool.end();
}

//cadastra novo usuário no banco
postgresDB.prototype.insertUser = async function(requisicao, resposta, next){
    const pool = new Pool(this.postGresUrl);
    const { user_name , user_email, user_pass } = requisicao.body
    try{
        const insertUser = await pool.query("INSERT INTO users ( user_name, user_email, user_pass) VALUES ($1, $2, $3) RETURNING *", [user_name, user_email, user_pass]);
        resposta.status(201).send(insertUser.rows);
    }
    catch(error){
        next(ApiError.databaseError({
            "erro": true,
            "code": error.code,
            "detail": error.detail
        }));
        return;
    }   
    pool.end();
}

//atualiza usuário pelo id no banco
postgresDB.prototype.updateUser = async function(requisicao, resposta, next){
    const pool = new Pool(this.postGresUrl);
    const { user_id, user_name, user_email, user_pass } = requisicao.body;
    
    try{
        const updateUser = await pool.query("UPDATE users SET user_name = ($1), user_email = ($2), user_pass = ($3) WHERE user_id = ($4) RETURNING *", 
        [user_name, user_email, user_pass, user_id]);
        resposta.status(202).send(updateUser.rows);
    }
    catch(error){
        next(ApiError.databaseError({
            "erro": true,
            "code": error.code,
            "detail": error.detail
        }));
        return;
    }
    pool.end();
}

//deleta usuário pelo id no banco
postgresDB.prototype.deleteUser = async function (requisicao, resposta, next){
    const pool = new Pool(this.postGresUrl);
    const {user_id} = requisicao.params;
    const getUser = await pool.query("SELECT * FROM users WHERE user_id = ($1)",
    [user_id]);
    if(getUser.rowCount === 0){
        next(ApiError.databaseError({
            "erro": true,
            "code": 404,
            "detail": 'User not found'
        }))
        return;
    }
    try{
        const deleteUser = await pool.query("DELETE FROM users WHERE user_id = ($1) RETURNING *", 
        [user_id]);
        resposta.status(202).send(deleteUser.rows);
    }
    catch(error){
        next(ApiError.databaseError({
            "erro": true,
            "code": error.code,
            "detail": error.detail
    }));
        return;
    }
    pool.end();
    
}

module.exports = {
    postgresDB: postgresDB
}