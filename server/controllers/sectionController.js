const SectionService = require('../services/sectionService.js');
const ApiError = require('../Error/ApiError');

class SectionController {
    async create(req, res, next) {
       await SectionService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    };

    async delete(req, res, next) {
        await SectionService.delete(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    async edit(req, res, next) {
        await SectionService.edit(req.body)
            .then(data => res.json(data))
            .catch(error => next(ApiError.badRequest(error.message)))
    }
    async getAll(req, res) {
        await SectionService.getAll()
        .then(data => res.json(data))
        .catch(error => res.status(500).json(error))
    }
}

module.exports = new SectionController();