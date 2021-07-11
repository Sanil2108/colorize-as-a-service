require('dotenv').config({path: (process.env.ENV == 'local' ? './.local.env' : '.env')})
const postgresDriver = require('./postgresDriver')
const sqsDriver = require('./sqsDriver')

async function pollMessages() {
  while (true) {
    messages = await sqsDriver.getInstance().poll()
    
    console.log(messages, "messages")

    for (let message of messages) {
      onMessageReceive(message)
    }
  }
}

function onMessageReceive(message) {
  sqsDriver.getInstance().deleteMessage(message.receiptHandle)
}

async function handler() {
  await postgresDriver.initialize()
  await sqsDriver.initialize()

  pollMessages()
}

handler()