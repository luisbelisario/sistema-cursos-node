const database = require('../models');
const { Op } = require("sequelize");

class TurmaController {
    static async findTurmas(req, res) {
        const { data_inicial, data_final } = req.query;
        const where = {}
        
        // se tiver algo nos parametros data_inicial ou data_final crio um atributo 
        // chamado data_inicio (que sera um objeto) dentro do objeto where
        data_inicial || data_final ? where.data_inicio = {} : null;
        
        // se tiver algo no parametro data_inicial crio um atributo chamado 
        // [Op.gte] dentro do objeto data_inicio que receberá o valor de data_inicial
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        
        // se tiver algo no parametro data_final crio um atributo chamado 
        // [Op.lte] dentro do objeto data_inicio que receberá o valor de data_final
        data_final ? where.data_inicio[Op.lte] = data_final : null;

        // agora esse endpoint filtra opcionalmente pelo intervalo de data passado pelo usuário
        
        try {
            const turmas = await database.Turmas.findAll({ where });
            return res.status(200).json(turmas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

/*     
    {
        where: {
            // essa coluna está na tabela turmas, é por ela que quero aplicar o filtro
            data_inicio: {
                [Op.gte]: data_inicial,
                [Op.lte]: data_final
            }
        }
    }
*/

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