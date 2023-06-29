const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.findPessoas);
router.get('/pessoas/:id', PessoaController.findUmaPessoa);
router.post('/pessoas', PessoaController.createPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);

module.exports = router;