const TypeService = require('../services/typeService.js');
const ApiError = require('../Error/ApiError');

class TypeController {
    create(req, res, next) {

        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase().split('')
            req.body.name[0] = req.body.name[0].toUpperCase()
            req.body.name = req.body.name.join('')
        }

        TypeService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    edit(req, res, next) {

        if (req.body.newName) {
            req.body.newName = req.body.newName.toLowerCase().split('');
            req.body.newName[0] = req.body.newName[0].toUpperCase();
            req.body.newName = req.body.newName.join('');
        }

        TypeService.edit(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    delete(req, res, next) {
        TypeService.delete(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    getAllId(req, res, next) {
        TypeService.getAllId(req.params)
            .then(data => res.json(data))
            .catch(error => next(error))
    }

    getAll(req, res, next) {
        TypeService.getAll()
            .then(data => res.json(data))
            .catch(error => next(error))
    }
}

module.exports = new TypeController();