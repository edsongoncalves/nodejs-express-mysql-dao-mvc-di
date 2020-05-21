const mysql = require('mysql2');


class ConnectionFactory {

    static getConnection(){

       return  mysql.createConnection({
            host     : 'localhost',
            port     : 3306,
            user     : 'edson',
            password : 'america',
            database : 'ecommercenode'
        });


    }

} 


module.exports = ConnectionFactory;