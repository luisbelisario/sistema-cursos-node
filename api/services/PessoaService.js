const Service = require('./Service');
const database = require('../models');

class PessoaService extends Service {

    constructor() {
        super('Pessoas')
        this.matriculas = new Service('Matriculas')
    }

    async findActiveRegisters(where = {}) {
        return database[this.modelName].findAll({where: { ...where }})
    }

    async findAllRegisters(where = {}) {
        return database[this.modelName]
            .scope('todos')
            .findAll({where: { ...where }})
    }

    async inactivatePerson(estudanteId) {
        return database.sequelize.transaction(async t => { 
            await super.updateById({ ativo: 0 }, estudanteId, { transaction: t });
            await this.matriculas.updateRegisters({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: t });
        })
    }

}

module.exports = PessoaService;