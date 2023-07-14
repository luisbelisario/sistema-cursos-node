const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController');

const router = Router();

router.get('/pessoas', PessoaController.findPessoasAtivas);
router.get('/pessoas/all', PessoaController.findAllPessoas);
router.get('/pessoas/:id', PessoaController.findUmaPessoa);
router.post('/pessoas', PessoaController.createPessoa);
router.put('/pessoas/:id', PessoaController.updatePessoa);
router.delete('/pessoas/:id', PessoaController.deletePessoa);
router.post('/pessoas/:id/restaura', PessoaController.restorePessoa);
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.findUmaMatricula);
router.post('/pessoas/:estudanteId/matricula', PessoaController.createMatricula);
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.updateMatricula);
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.deleteMatricula);

module.exports = router;