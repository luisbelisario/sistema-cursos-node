const database = require('../models');
// não preciso adicionar o index porque ele já busca pelo arquivo index.js nessa pasta

class PessoaController {

    static async findPessoas(req, res) {
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;