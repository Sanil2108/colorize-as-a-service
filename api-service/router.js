const router = require('express').Router()

const { schemaValidationMiddleware } = require('./common/middleware')
const handler = require('./handler')
const schemas = require('./schemas')

router.post('/upload', schemaValidationMiddleware(schemas.uploadSchema), handler.uploadImage)
router.post('/getURL', schemaValidationMiddleware(schemas.getURLSchema), handler.getURL)
router.post('/checkStatus', schemaValidationMiddleware(schemas.checkStatusSchema), handler.checkStatus)

module.exports = router