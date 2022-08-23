const mysql = require('mysql2')
require ('dotenv').config()

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbName = process.env.DB_NAME
const dbAdress = process.env.DB_ADRESS
const dbPort = process.env.DB_PORT


const conexao = mysql.createConnection({
    host:dbAdress, 
    port: dbPort,
    user: dbUser,
    password: dbPass,
    database: dbName
})


module.exports=conexao