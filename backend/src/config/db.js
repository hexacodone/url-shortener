// src/config/db.js
const pgp = require('pg-promise')()

const connection = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
}

console.log('Database connection config:', {
  host: connection.host,
  port: connection.port,
  database: connection.database,
  user: connection.user,
  // password ausgelassen aus Sicherheitsgründen
})

const db = pgp(connection)

// Test der Verbindung
db.connect()
  .then(obj => {
    console.log('Database connection successful')
    obj.done() // success, release the connection
  })
  .catch(error => {
    console.log('ERROR:', error.message || error)
  })

module.exports = db