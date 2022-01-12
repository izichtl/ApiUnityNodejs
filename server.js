/*
*Autor:     Ivan Zichtl - 23/09/2012
*Objetivo:  Configura o servidor
*           Chama os middlewares
*/

const express = require('express')
var cors = require('cors') 
const routes = require('./routes/userRoutes.js');
const views = require('./views/views.js');
const apiErrorHandler = require('./error/apiErrorHandler');

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require('dotenv').config()

routes(app);
views(app);
app.use(apiErrorHandler);
module.exports = app

