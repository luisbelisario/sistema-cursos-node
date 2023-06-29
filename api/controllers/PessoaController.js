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

    static async findUmaPessoa(req, res) {
        const { id } = req.params;
        // tenho que o id colocar entre chaves para não dar erro
        try {
            const pessoa = await database.Pessoas.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(pessoa);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async createPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const pessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(pessoaCriada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async updatePessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Pessoas.update(novasInfos, { where: {id: Number(id)} });
            const pessoaAtualizada = await database.Pessoas.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deletePessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.destroy({ where: {id: Number(id)} });
            return res.status(200).json({mensagem : `Id ${id} deletado`});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;