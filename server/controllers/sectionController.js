const SectionService = require('../services/sectionService.js');
const ApiError = require('../Error/ApiError');

class SectionController {
    create(req, res, next) {

        if(req.body.name) {
            req.body.name = req.body.name.toLowerCase().split('')
            req.body.name[0] = req.body.name[0].toUpperCase()
            req.body.name = req.body.name.join('')
        }
        
        console.log(req.body.name)
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

        if(req.body.newName) {
            req.body.newName = req.body.newName.toLowerCase().split('');
            req.body.newName[0] = req.body.newName[0].toUpperCase();
            req.body.newName = req.body.newName.join('');
        }
        
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