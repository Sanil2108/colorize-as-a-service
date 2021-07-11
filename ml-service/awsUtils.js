const moment = require('moment')
const axios = require('axios')

const getAWSCredentials = async () => {
  response = await axios.get(process.env.AWS_METADATA_URL)
  return {
    ...response.data
  }
}

let getAutoRefreshingAWSCredentials
(async () => {
  class Credentails {
    constructor() {
      this.credentialsObj = {}
    }
  }
  
  currentCredentials = new Credentails()

  async function updateCredentials() {
    currentCredentials.credentialsObj = await getAWSCredentials()
    const whenToUpdateCredentials = moment.utc('2021-07-10T21:20:11Z').diff(moment.utc(), 'milliseconds')
    setTimeout(updateCredentials, whenToUpdateCredentials)
  }

  p = updateCredentials()

  getAutoRefreshingAWSCredentials = async () => {
    await p
    return currentCredentials
  }
})()

module.exports = {
  getAutoRefreshingAWSCredentials
}