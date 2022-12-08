const TypeService = require('../services/typeService.js');
const ApiError = require('../Error/ApiError');

class TypeController {
    async create(req, res, next) {
        await TypeService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    async edit(req, res, next) {
        await TypeService.edit(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    async delete(req, res, next) {
        await TypeService.delete(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    async getAllId(req, res, next) {
        await TypeService.getAllId(req.params)
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }

    async getAll(req, res, next) {
        await TypeService.getAll()
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }
}

module.exports = new TypeController();