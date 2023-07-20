const database = require('../models');

class Service {

    constructor(modelName) {
        this.modelName = modelName;
    }

    async findAll() {
        return database[this.modelName].findAll({where: { ...where }});
    }

    async findOne(id) {

    }

    async create(data) {

    }

    async updateById(data, id, transaction = {}) {
        return database[this.modelName]
            .update(data, { where: {id: id} }, transaction)
    }

    async updateRegisters(data, where, transaction = {}) {
        return database[this.modelName]
            .update(data, { where: { ...where } }, transaction)
    }

    async delete(id) {

    }
}

module.exports = Service;