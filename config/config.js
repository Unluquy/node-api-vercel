const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    USER : process.env.USER || 'root',
    PASSWORD : process.env.PASSWORD || 'password',
    DATABASE : process.env.DATABASe || '',
    PORT : process.env.PORT || 3000
}