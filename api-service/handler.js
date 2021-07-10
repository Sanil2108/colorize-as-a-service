const postgresDriver = require('./drivers/postgresDriver')
const {PREDICTIONS_TABLE_NAME} = require('./common/constants')

const uploadImage = async (req, res, next) => {
  const body = req.body
  
  const {rows} = await postgresDriver.getInstance().query(
    `INSERT INTO ${PREDICTIONS_TABLE_NAME}(input_url) values ($1) RETURNING id AS predictionId`,
    body.imageURL
  )

  res.status(200).send(rows[0])
}

const getURL = async (req, res, next) => {
  const body = req.body

  // Check if the record exists
  const {rows} = await postgresDriver.getInstance().query(
    `SELECT * FROM ${PREDICTIONS_TABLE_NAME} WHERE id = $1`,
    body.predictionId
  )

  if (rows.length == 0) {
    res.status(404).send({
      error: "There is no prediction with this prediction ID"
    })
    return
  }
  if (!rows[0].prediction_complete) {
    res.status(400).send({
      error: "This prediction is not complete"
    })
    return
  }

  res.send({
    output: rows[0].output_uri
  })
  return
}

const checkStatus = async (req, res, next) => {
  const body = req.body

  // Check if the record exists
  const {rows} = await postgresDriver.getInstance().query(
    `SELECT * FROM ${PREDICTIONS_TABLE_NAME} WHERE id = $1`,
    body.predictionId
  )

  if (rows.length == 0) {
    res.status(404).send({
      error: "There is no prediction with this prediction ID"
    })
    return
  }

  res.send({
    complete: rows[0].prediction_complete
  })
  return
}

module.exports = {
  uploadImage,
  getURL,
  checkStatus
}