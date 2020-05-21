const produtoDao = require('../dao/ProdutoDao');
const ConnectionFactory = require('../util/ConnectionFactory');
const Produto = require('../model/Produto');


class ProdutoController {


    cadastro = (req, res, next) => {
        const { nome, imagem, preco } = req.body;

        console.log(req.body)

        const produto = new Produto(null, nome, imagem, preco)

        const connection = ConnectionFactory.getConnection()

        new produtoDao(connection)
            .cadastrar(produto)
            .then(
                 (result) => {
                    if (result.length === 0) res.json({ "msg": "Não foi cadastrado o produto" })
                    else {
                        res.json(result)

                    }
                }
            )
            .then(connection.end())
            .catch(next)

    }


    todos = (req, res, next) => {

        const connection = ConnectionFactory.getConnection()
        new produtoDao(connection)
            .todos()
            .then(
                (result) => {
                    if (result.length === 0) res.json({ "msg": "Não existem produtos" })
                    else {
                        res.json(result)

                    }
                }
            )
            .then(connection.end())
            .catch(next)

    }

    pesquisaPorId = (req, res, next) => {

        const id = parseInt(req.query.id) || 0

        const connection = ConnectionFactory.getConnection()

        if(id===0) next

        new produtoDao(connection)
            .buscarPorId(id)
            .then(
                (result) => {
                    if (result.length === 0) res.json({ "msg": "Não foi possível encontrar o ID" })
                    else {
                        res.json(result)

                    }
                }
            )
            .then(connection.end())
            .catch(next)

    }




    produtos = (req, res, next) => {
        const connection = ConnectionFactory.getConnection()
        let size = parseInt(req.query.size) || 5;
        let pagina = parseInt(req.query.pagina) || 1;
        new produtoDao(connection)
        .count()
        .then(resultado => { 
    
            const total = resultado[0].total;
            const paginas = Math.ceil(total / size);
            const offset =size * (pagina- 1);
    
            new produtoDao(connection)
            .todosPaginando(offset, size)
            .then(connection.end())
              .then(resultado => {
                var response = {
                    result: resultado
                };
                
                if (paginas>1) {
    
                    response.paginacao = {
                        pagina: pagina,
                        limite: size,
                        total: total,
                        paginas: paginas,
                        anterior: pagina > 1 ? pagina - 1 : undefined,
                        proxima: pagina < paginas ? pagina + 1 : undefined
                    }
                }
    
                res.json(response);
              });
        })
        .catch(next);

    }


    atualiza = (req, res, next) => {

        const { id, nome, imagem, preco } = req.body;

        const produto = new Produto(id, nome, imagem, preco)

        const connection = ConnectionFactory.getConnection()

        new produtoDao(connection)
            .atualizar(produto)
            .then(
                (result) => {
                    if (result.length === 0) res.json({ "msg": "Sem produtos Cadastrados" })
                    else {
                     
                        res.json(result)


                    }
                }
            )
            .then(connection.end())
            .catch(next)

    }


    exclui = (req, res, next) => {

        const id = parseInt(req.query.id) || 0

        const connection = ConnectionFactory.getConnection()

        if(id===0) next

        new produtoDao(connection)
            .excluir(id)
            .then(
                (result) => {
                    if (result.length === 0) res.json({ "msg": "Não foi possível excluir" })
                    else {
                        res.json(result)

                    }
                }
            )
            .then(connection.end())
            .catch(next)

    }

}

module.exports = ProdutoController