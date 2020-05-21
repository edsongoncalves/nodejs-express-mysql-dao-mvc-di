    class ProdutoDao {

    
        constructor(connection) {
      
            this.connection = connection;
        }
    
        todos() {
            const p = new Promise( (resolve, reject) => {
                this.connection.query('SELECT * FROM produtos', (err, p) => {
                    if(err) return reject(err);
     
                    resolve(p);
                })
      
              }
            );
      
            return p;
    
        }

    count() {
        const p = new Promise( (resolve, reject) => {

            this.connection.query('SELECT count(1) as total from produtos', (err, p) => {
                if(err) return reject(err);

                resolve(p);
            });
        });
        return p;
    }
    
    todosPaginando(offset, limit){
        const p = new Promise( (resolve, reject) => {
            this.connection.query('SELECT * FROM produtos LIMIT ? OFFSET ?', 
				[limit, offset], 
		(err, produtos) => {

                if(err) return reject(err);

                resolve(produtos);
            });
        });
        return p;
    }

      
        buscarPorId(id) {
      
            var p = new Promise( (resolve, reject) => {
                this.connection.query('SELECT * FROM produtos WHERE id=?', id, (err, produto) => {
                    if(err) return reject(err);
      
                    resolve(produto);
                })
      
              }
            );
      
            return p;
        }
    
        cadastrar(produto){
    
            var p = new Promise( (resolve, reject) => {
                this.connection.query('INSERT INTO produtos (nome, imagem, preco) VALUES (?,?,?)', 
                    [produto.nome, produto.imagem, produto.preco],
                    (err, prod) => {
                    if(err) return reject(err);
     
                    resolve(prod);
                })
      
              }
            );
    
            return p;
    
        }
      
   
        atualizar(produto){
    
                var p = new Promise( (resolve, reject) => {
                    this.connection.query('UPDATE produtos SET nome=?, imagem=?, preco=? WHERE id=?', 
                        [produto.nome, produto.imagem, produto.preco, produto.id],
                        (err, prod) => {
                        if(err) return reject(err);
         
                        resolve(prod);
                    })
          
                  }
                );
        
                return p;
        
        }
    
        excluir(id){
    
                    var p = new Promise( (resolve, reject) => {
                        this.connection.query('DELETE FROM produtos WHERE id=?', id, (err, prod) => {
                            if(err) return reject(err);
             
                            resolve(prod);
                        })
              
                      }
                    );
            
                    return p;
            
        }

      
      }
    
      module.exports = ProdutoDao;