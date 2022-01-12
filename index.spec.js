/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Realiza os testes unitários da rota /user
*           
*/
const app = require('./server');
const request = require('supertest');


describe('TESTE DE ROTAS /USER', () => {

    it('ROTA ==> GET', async()=>{
        const resposta = await request(app)
        .get('/user');
        expect(resposta.body[0]).toHaveProperty('user_id');
        expect(resposta.statusCode).toEqual(200);
    })

    it('ROTA ==> POST', async()=>{
        const resposta = await request(app)
        .post('/user')
        .send({
            "user_name": "TEST UNITÁRIO",
            "user_email": "teste@teste.com"
        });
        expect(resposta.body[0]).toHaveProperty('user_id');
        expect(resposta.statusCode).toEqual(201);
        
    })

    it('ROTA ==> UPDATE', async()=>{
        let user_id
        //capitura user_id do teste /post
        const getId = await request(app).get('/user')
        getId.body.forEach(element => {
            if(element.user_email == 'teste@teste.com'){
                user_id = element.user_id
            }
        });
        const resposta = await request(app)
        .put(`/user/${user_id}`)
        .send({
            "user_id": user_id,
            "user_name": "TEST UPDATE",
            "user_email": "teste@teste.com"
        })
        expect(resposta.body[0]).toHaveProperty('user_id');
        expect(resposta.statusCode).toEqual(202);
    })

    it('ROTA ==> DELETE', async()=>{
        let user_id;
        //capitura user_id do teste /post
        const getId = await request(app).get('/user');
        getId.body.forEach(element => {
            if(element.user_email == 'teste@teste.com'){
                user_id = element.user_id
            }
        });
        const resposta = await request(app)
        .delete(`/user/${user_id}`);
        expect(resposta.body[0]).toHaveProperty('user_id');
        expect(resposta.statusCode).toEqual(202);
    })
})