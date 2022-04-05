const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Variable', {
  userSelected: Joi.string(),
  themeSelected: Joi.string(),
  resultat: Joi.number()
})
