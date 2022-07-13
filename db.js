const { Client } = require("pg")
const { getDatabaseUri } = require("./config")
require("colors")

//create a new database from the database uri
const db = new Client({ connectionString : getDatabaseUri() })

//connect to our database, log any potential errors
db.connect((err) => {
    if(err) {
        console.error("connection error", err.stack)
    } else {
        console.log("Successfully connected to postgres database!".blue)
    }
})

module.exports = db