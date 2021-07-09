const Joi = require('joi')

const getURLSchema = Joi.object({
  predictionId: Joi.string().uuid({version: 'uuidv4'}).required()
})

const uploadSchema = Joi.object({
  imageURL: Joi.string().pattern(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/).required()
})

const checkStatusSchema = Joi.object({
  predictionId: Joi.string().uuid({version: 'uuidv4'}).required()
})

module.exports = {
  getURLSchema,
  uploadSchema,
  checkStatusSchema
}