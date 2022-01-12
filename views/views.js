/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Cria as rotas do front-end.
*           Retorna o front-end ao browser.
*/
const serveStatic = require('serve-static')
const path = require('path')

module.exports = function(app) {

    app.use('/',serveStatic(path.join(__dirname, './dist')))
    app.use('/cadastro',serveStatic(path.join(__dirname, './dist')))

};