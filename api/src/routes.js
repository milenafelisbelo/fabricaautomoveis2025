const express = require('express');
const router = express.Router();

const Automovel = require('./controllers/automovel');
const Cliente = require('./controllers/cliente');
const Concessionaria = require('./controllers/concessionaria');
const Venda = require('./controllers/venda');
const Alocacao = require('./controllers/alocacao');

router.get('/automoveis', Automovel.read);
router.get('/clientes', Cliente.read);
router.get('/concessionarias', Concessionaria.read);
router.get('/vendas', Venda.read);
router.post('/vendas', Venda.post);
router.get('/alocacoes', Alocacao.read);

// Example routes
router.get('/', (req, res) => {
    res.json({ titulo: 'Fabrica de automoveis 2025' });
});

module.exports = router;