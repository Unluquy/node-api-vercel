const mariadb = require('mariadb');
const config = require('./config.js');

const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT,
    trace : true
})

pool.getConnection((err, connection) => {
    if (err) {
      console.log("not connected due to error: " + err);
    } else {

        if(connection) connection.release();
        console.log("connected ! connection id is " + conn.threadId);
    }
    return;
  });

module.exports = pool;