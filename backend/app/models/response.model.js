const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('Response', {
  resultId: Joi.number().required(),
  questionId: Joi.number().required(),
  responseIndex: Joi.number(),
})
