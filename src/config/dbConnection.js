const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'btb75txot79gpnvzheed-mysql.services.clever-cloud.com',
        user: 'u35m5t1uvwarirqg',
        password: '4uwRWy11tJ6dF2eIlY5O',
        port: 3306,
        database: 'btb75txot79gpnvzheed'
    });
}