const TypeService = require('../services/typeService.js');
const ApiError = require('../Error/ApiError');

class TypeController {
    create(req, res, next) {
        TypeService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    edit(req, res, next) {
        TypeService.edit(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    delete(req, res, next) {
        TypeService.delete(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    getAllId(req, res, next) {
        TypeService.getAllId(req.params)
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }

    getAll(req, res, next) {
        TypeService.getAll()
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }
}

module.exports = new TypeController();