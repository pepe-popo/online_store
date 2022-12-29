const ApiError = require('../Error/ApiError');
const DeviceService = require('../services/deviceService');


class DeviceController {
    create(req, res, next) {

        if (req.body.name) {
            req.body.name = req.body.name.toLowerCase().split('')
            req.body.name[0] = req.body.name[0].toUpperCase()
            req.body.name = req.body.name.join('')
        }

        DeviceService.create(req.body)
            .then(data => res.json(data))
            .catch(error => next(error))
    }
}

module.exports = new DeviceController();