const produtoDao = require('../dao/ProdutoDao')
const ConnectionFactory = require('../util/ConnectionFactory')
const Produto = require('../model/produto')

//primeira forma de testar
describe('Produto', () => {
    test('foi criado um produto',  async () => {
        const produto = new Produto(null, "Novo Produto", null, 100.99)

        const connection =  ConnectionFactory.getConnection()
        
        let result = await new produtoDao(connection).cadastrar(produto)

        connection.close()

        expect(result).toHaveProperty('affectedRows', 1)

    })
})

describe('Todos os Produtos', () => {
    test('existe um ou mais produtos',  async () => {

        const connection =  ConnectionFactory.getConnection()
        
        let result = await new produtoDao(connection).todos()

        connection.close()

        expect(result.length).toBeGreaterThanOrEqual(1)

    })
})

describe('Encontrar um Produto', () => {
    test('foi encontrado o produto 1',  async () => {

        const connection =  ConnectionFactory.getConnection()
        
        let result = await new produtoDao(connection).buscarPorId(1)

        connection.close()

        expect(result.length).toEqual(1)

    })
})

describe('Contagem de Produtos', () => {
    test('existe um ou mais produtos',  async () => {

        const connection =  ConnectionFactory.getConnection()
        
        let result = await new produtoDao(connection).count()

        connection.close()

        expect(result[0].total).toBeGreaterThanOrEqual(1)

    })
})

describe('Paginar os Produtos', () => {
    test('existe um ou mais produtos',  async () => {

        const connection =  ConnectionFactory.getConnection()
        let size = 5;
        let pagina = 1;
        let contar = await new produtoDao(connection).count()
        let total = contar[0].total;
        let offset =size * (pagina- 1);


        let result = await new produtoDao(connection).todosPaginando(offset, size)

        connection.close()

        expect(result.length).toBeGreaterThanOrEqual(1)

    })
})

//atualizar
describe('Produto', () => {
    test('foi atualizado o produto 1',  async () => {
        const produto = new Produto(1, "Alterar Nome do Produto", null, 99.99)

        const connection =  ConnectionFactory.getConnection()
        
        let result = await new produtoDao(connection).atualizar(produto)

        connection.close()

        expect(result).toHaveProperty('affectedRows', 1)

    })
})

//segunda forma de testar
describe('Produto', () => {
    test('foi criado um produto',  () => {
        const produto = new Produto(null, "Novo Produto", null, 100.99)

        const connection =  ConnectionFactory.getConnection()

        
         new produtoDao(connection).cadastrar(produto).then((result) => {
            connection.close()
            expect(result).toHaveProperty('affectedRows', 1)

        })

    })
})


describe('Produto', () => {
    test('foi removido o produto 1',  async () => {

        const connection =  ConnectionFactory.getConnection()
        
        await new produtoDao(connection).excluir(1)
        let result = await new produtoDao(connection).buscarPorId(1)

        connection.close()

        expect(result.length).not.toEqual(1)

    })
})
