const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  nom: Joi.string().required(),
  prenom: Joi.string().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  resultats: Joi.string(),
  maladie: Joi.string().required(),
  daltonisme: Joi.string().required(),
})
