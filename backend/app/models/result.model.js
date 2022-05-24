const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Result', {
  userId: Joi.number().required(),
  quizId: Joi.number().required(),
  results: Joi.array(),
})
