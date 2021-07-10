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

function getInstance() {
  if (driver == null) {
    driver = new PostgresDriver()
    driver.initialize()
  }

  return driver
}


module.exports = {
  getInstance
}