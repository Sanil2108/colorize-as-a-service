const { Client } = require('pg')

class PostgresDriver {
  constructor() {
    this.client = new Client({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.DATABASE,
      password: process.env.POSTGRES_PASSWORD,
    })
  }

  async initialize() {
    await this.client.connect()
  }

  async query(queryString, ...args) {
    const res = await this.client.query(queryString, args)

    const {rows} = res

    return {rows}
  }
}

let driver

async function initialize() {
  driver = new PostgresDriver()
  await driver.initialize()
}

function getInstance() {
  return driver
}


module.exports = {
  getInstance,
  initialize
}