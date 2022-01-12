/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Captura a porta oferecida pelo host e roda o servidor.
*           
*/
const app = require('./server');
const PORT = process.env.PORT || 8080

app.listen(PORT)
console.log(`Servidor Rodando ==> http://localhost:${PORT}/`)