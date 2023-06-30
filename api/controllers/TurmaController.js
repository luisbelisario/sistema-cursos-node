const database = require('../models');

class TurmaController {
    static async findTurmas(req, res) {
        try {
            const turmas = await database.Turmas.findAll();
            return res.status(200).json(turmas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findUmaTurma(req, res) {
        const { id } = req.params;
        // tenho que o id colocar entre chaves para não dar erro
        try {
            const turma = await database.Turmas.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(turma);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async createTurma(req, res) {
        const novaTurma = req.body;
        try {
            const turmaCriada = await database.Turmas.create(novaTurma);
            return res.status(200).json(turmaCriada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async updateTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Turmas.update(novasInfos, { where: {id: Number(id)} });
            const turmaAtualizada = await database.Turmas.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deleteTurma(req, res) {
        const { id } = req.params;
        try {
            await database.Turmas.destroy({ where: {id: Number(id)} });
            return res.status(200).json({mensagem : `Id ${id} deletado`});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController;