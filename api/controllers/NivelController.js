const database = require('../models');

class NivelController {
    static async findNiveis(req, res) {
        try {
            const niveis = await database.Niveis.findAll();
            return res.status(200).json(niveis);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findUmNivel(req, res) {
        const { id } = req.params;
        // tenho que o id colocar entre chaves para não dar erro
        try {
            const nivel = await database.Niveis.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(nivel);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async createNivel(req, res) {
        const novoNivel = req.body;
        try {
            const nivelCriado = await database.Turmas.create(novoNivel);
            return res.status(200).json(nivelCriado);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async updateNivel(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await database.Niveis.update(novasInfos, { where: {id: Number(id)} });
            const nivelAtualizado = await database.Niveis.findOne( {
                where: {
                    id: Number(id)
                }
            } )
            return res.status(200).json(nivelAtualizado);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deleteNivel(req, res) {
        const { id } = req.params;
        try {
            await database.Niveis.destroy({ where: {id: Number(id)} });
            return res.status(200).json({mensagem : `Id ${id} deletado`});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = NivelController;