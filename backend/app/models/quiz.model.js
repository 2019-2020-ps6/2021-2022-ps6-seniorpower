const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Quiz', {
  theme: Joi.string().required(),
  name: Joi.string().required(),
  id: Joi.number().required(),
  questions: Joi.array().required(),
  creationDate: Joi.string(),
})
