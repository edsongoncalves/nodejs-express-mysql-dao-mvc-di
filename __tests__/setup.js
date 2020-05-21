const ConnectionFactory = require('../util/ConnectionFactory');


beforeAll(  () => {
    const connection = ConnectionFactory.getConnection()

    let sql = "CREATE TABLE produtos2 (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100), imagem VARCHAR(100), preco DECIMAL(10,2))"
    
    connection.connect()

    connection.query(sql, function (err, data) {
        if (err) throw err;
      })

    connection.end()
})
  
afterAll(  () => {
    const connection = ConnectionFactory.getConnection()

    let sql = "DROP TABLE produtos2"

    connection.connect()

    connection.query(sql, function (err, data) {
        if (err) throw err;
      })

    connection.end()
})