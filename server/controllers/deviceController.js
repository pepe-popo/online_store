const ApiError = require('../Error/ApiError');
const DeviceService = require('../services/deviceService');


class DeviceController {
    create(req, res, next) {
        DeviceService.create(req.body)
        .then(data => res.json(data))
        .catch(error => next(ApiError.badRequest(error.message)))
    }  
}

module.exports = new DeviceController();