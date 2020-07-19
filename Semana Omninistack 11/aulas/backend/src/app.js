const express = require("express");
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate')
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());


/**
 * Método HTTP
 *
 * O método GET: é usando sempre que queremos que seja retornado algo na requisição
 * O método POST: Criar uma informação no nosso backend
 * O método PUT: Alteração de dados no backend
 * O método DELETE: Deletar dados do backend
 *
 */

/**
 * Outros tipos de parametros
 *
 * Query: parametros nomeados na rota apos o simbolo de interrogação usados para filtros, paginação etc
 * Route Params: Parâmetros utilizados utilizados para identificar recursos
 * Request Body: Corpo da requisição
 *
 */

module.exports = app;