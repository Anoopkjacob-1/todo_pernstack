const Pool =require('pg').Pool

const pool=new Pool({
    "user":"postgres",
    "password":"anoop",
    "host":"localhost",
    "database":"pernstack",
    "port":5432
})
module.exports=pool;