const request = require('supertest');
const express = require('express');
const router = express.Router();
const app = express();
const ProdutoController = require('../controller/ProdutoController');

beforeEach(() => {
    const produtoController = new ProdutoController;
    router.post('/cadastro', produtoController.cadastro);
    router.put('/atualiza', produtoController.atualiza);
    router.get('/todos', produtoController.todos);
    router.get('/pesquisaPorId', produtoController.pesquisaPorId);
    router.get('/produtos', produtoController.produtos);
    router.delete('/exclui', produtoController.exclui);

    app.use(express.json());
    app.use(router);
    
});


describe("Cadastra um Produto",  () => {
    it("consegue adicionar um produto", async() =>{
        

      const response = await request(app)
        .post("/cadastro")
        .send({
             'nome':'Produto 1', 
             'imagem': null, 
             'preco': '199.99' 
        })

      expect(response.statusCode).toBe(200)

    });
});


describe("Todos os Produtos", () => {
    test("responde com todos os produtos", async() =>{

      const response = await request(app).get("/todos")
      expect(response.statusCode).toBe(200)
      }
    );
});


describe("Pesquisa um Produto", () => {
    test("responde com um produto", async() =>{

      const response = await request(app).get("/pesquisaPorId").query({ id: 1 })
      expect(response.statusCode).toBe(200)
      }
    );
});


describe("Pesquisa Produtos com Paginação", () => {
    test("responde com produtos em paginação", async() =>{

      const response = await request(app).get("/produtos").query({ pagina: 1 })
      expect(response.statusCode).toBe(200)
      }
    );
  });


describe("Atualiza um Produto",  () => {
    it("consegue atualizar um produto", async() =>{
        

      const response = await request(app)
        .put("/atualiza")
        .send({
             'nome':'Produto 1 Atualizado', 
             'imagem': null, 
             'preco': 1199.99
        })

      expect(response.statusCode).toBe(200)

    });
});

describe("Excluir um Produto", () => {
    test("excluiu um produto", async() =>{

      const response = await request(app).delete("/exclui").query({ id: 1 })
      expect(response.statusCode).toBe(200)
      }
    );
});