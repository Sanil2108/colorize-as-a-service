const {getAutoRefreshingAWSCredentials} = require('../common/awsUtils')

const sqs = require('@aws-sdk/client-sqs')
const { SendMessageCommand } = require('@aws-sdk/client-sqs')

class SQSDriver {
  constructor() {
    this.sqsClient = null
  }
  
  async initialize() {
    const {AccessKeyId, SecretAccessKey, Token} = (await getAutoRefreshingAWSCredentials()).credentialsObj

    this.sqsClient = new sqs.SQSClient({
      region: 'ap-south-1',
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: Token
      }
    })  
  }

  sendMessageAsync(message) {
    const sendMessageCommand = new SendMessageCommand({MessageBody: message, QueueUrl: process.env.SQS_QUEUE_URL, MessageGroupId: 'random'})

    this.sqsClient.send(sendMessageCommand)
  }
}

let driver

async function initialize() {
  driver = new SQSDriver()
  await driver.initialize()
}

function getInstance() {
  return driver
}

module.exports = {
  initialize,
  getInstance
}