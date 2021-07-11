const { getAutoRefreshingAWSCredentials } = require("./awsUtils");

const sqs = require("@aws-sdk/client-sqs");
const {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} = require("@aws-sdk/client-sqs");

class SQSDriver {
  constructor() {
    this.sqsClient = null;
  }

  async initialize() {
    const { AccessKeyId, SecretAccessKey, Token } = (
      await getAutoRefreshingAWSCredentials()
    ).credentialsObj;

    this.sqsClient = new sqs.SQSClient({
      region: "ap-south-1",
      credentials: {
        accessKeyId: AccessKeyId,
        secretAccessKey: SecretAccessKey,
        sessionToken: Token,
      },
    });
  }

  async poll() {
    const command = new ReceiveMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
    });

    const response = await this.sqsClient.send(command);

    return response.Messages && response.Messages.length > 0
      ? response.Messages.map((message) => ({
          receiptHandle: message.ReceiptHandle,
          body: message.Body,
        }))
      : [];
  }

  async deleteMessage(receiptHandle) {
    const command = new DeleteMessageCommand({
      QueueUrl: process.env.SQS_QUEUE_URL,
      ReceiptHandle: receiptHandle,
    });

    const response = await this.sqsClient.send(command);
  }
}

let driver;

async function initialize() {
  driver = new SQSDriver();
  await driver.initialize();
}

function getInstance() {
  return driver;
}

module.exports = {
  initialize,
  getInstance,
};
