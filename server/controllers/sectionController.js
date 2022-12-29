const SectionService = require('../services/sectionService.js');
const ApiError = require('../Error/ApiError');

class SectionController {
    create(req, res, next) {
        SectionService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    };

    delete(req, res, next) {
        SectionService.delete(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    edit(req, res, next) {
        SectionService.edit(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
    getAll(req, res) {
        SectionService.getAll()
            .then(data => res.json(data))
            .catch(error => next(error))
    }
}

module.exports = new SectionController();