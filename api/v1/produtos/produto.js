const express = require('express');
const router = express.Router();

const ProdutoController = require('../../../controller/ProdutoController');

const produtoController = new ProdutoController;

router.get('/todos', produtoController.produtos);
router.post('/cadastro', produtoController.cadastro);
router.put('/atualizar', produtoController.atualiza);

module.exports = router;