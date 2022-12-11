const ApiError = require('../Error/ApiError');
const UserService = require('../services/userService.js');

class UserController {
    registration(req, res, next) {
        UserService.registration(req.body)
            .then(token => res.json({ token }))
            .catch(error => next(ApiError.badRequest(error.message)))
    }

    login(req, res, next) {
        UserService.login(req.body)
            .then(token => res.json({ token }))
            .catch(error => next(ApiError.badRequest(error.message)));
    }

    check(req, res, next) {
        UserService.check(req)
            .then(token => res.json({ token }))
            .catch(error => res.status(500).json(error.message))
    }
}


module.exports = new UserController();