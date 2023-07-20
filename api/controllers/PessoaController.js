// const database = require('../models');
// não preciso adicionar o index porque ele já busca pelo arquivo index.js nessa pasta
const Sequelize = require('sequelize');

const { PessoaService } = require('../services');
const pessoaService = new PessoaService();

class PessoaController {

    static async findPessoasAtivas(req, res) {
        try {
            const pessoas = await pessoaService.findActiveRegisters();
            return res.status(200).json(pessoas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findAllPessoas(req, res) {
        try {
            const pessoas = await pessoaService.findAllRegisters();
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

    static async restorePessoa(req, res) {
        const { id } = req.params;
        try {
            await database.Pessoas.restore({ where: {id: Number(id)} })
            return res.status(200).json({mensagem : `Id: ${id} restaurado`})
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        // tenho que o id colocar entre chaves para não dar erro
        try {
            const matricula = await database.Matriculas.findOne( {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            } )
            return res.status(200).json(matricula);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async createMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const matriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(matriculaCriada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // /pessoas/estudanteId/matricula/matriculaId
    static async updateMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await database.Matriculas.update(novasInfos, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            });
            const matriculaAtualizada = await database.Matriculas.findOne( {
                where: {
                    id: Number(matriculaId)
                }
            } )
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async deleteMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await database.Matriculas.destroy({ where: {id: Number(matriculaId), estudante_id: Number(estudanteId)} });
            const pessoa = await database.Pessoas.findOne( {
                where: {
                    id: Number(estudanteId)
                }
            } )
            return res.status(200).json({mensagem : `Matricula ${matriculaId} do estudante ${pessoa.nome} deletada`});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findMatriculasByPerson(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(estudanteId)} });
            const matriculas = await pessoa.getMatriculasConfirmadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findMatriculasByTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasAsMatriculas = await database.Matriculas
            .findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            })
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async findTurmasLotadas(req, res) {
        const lotacaoTurma = 2;
        try {
            const turmasLotadas = await database.Matriculas
            .findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`COUNT(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    static async inactivatePerson(req, res) {
        const { estudanteId } = req.params;
        console.log(estudanteId);
        try {
            await pessoaService.inactivatePerson(Number(estudanteId));
            return res.status(200).json({message: `Estudante de id ${estudanteId} inativado e matriculas canceladas`});
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController;