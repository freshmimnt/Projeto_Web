const dotenv = require('dotenv');
dotenv.config()

const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'root',
    host:'localhost',
    database: 'farm2u_db',
    password:'p4ssw0rd',
    port: 5432,   
})
  
module.exports = pool