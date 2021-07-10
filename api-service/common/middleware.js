const requestLogger = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}]: ${req.method} Request for route ${req.originalUrl}`)

  next()
}

const schemaValidationMiddleware = (schema) => (req, res, next) => {
  const {value, error} = schema.validate(req.body)
  if (error != null) {
    res.status(400).send({
      error: error.details.map(detail => detail.message).join(', ')
    })
  }
  else {
    req.body = value
    next()
  }
}

module.exports = {
  requestLogger,
  schemaValidationMiddleware
}