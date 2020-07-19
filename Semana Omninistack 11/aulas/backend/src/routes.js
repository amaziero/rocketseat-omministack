const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const routes = express.Router();
const OngControler = require('./database/controllers/OngControllers');
const IncidentsControlles = require('./database/controllers/IncidentsControllers');
const ProfileControllers = require('./database/controllers/ProfileControllers');
const SessionControllers = require('./database/controllers/SessionControllers');

routes.use(express.json());

// Rotas de login da aplicação
routes.post('/session', SessionControllers.create)

// Rotas da Ong
routes.get('/ongs', OngControler.index);

routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngControler.create)

// Rotas da Incedents
routes.post('/incidents', IncidentsControlles.create)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentsControlles.index)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), IncidentsControlles.delete)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileControllers.index)


module.exports = routes;