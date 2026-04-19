const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/database/helpdesk.db')
module.exports = db