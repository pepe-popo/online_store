const ApiError = require('../Error/ApiError');
const UserService = require('../services/userService.js');

class UserController {
    registration(req, res, next) {
        UserService.registration(req.body)
            .then(token => res.json({ token }))
            .catch(error => next(error))
    }

    login(req, res, next) {
        UserService.login(req.body)
            .then(token => res.json({ token }))
            .catch(error => next(error));
    }

    check(req, res, next) {
        UserService.check(req)
            .then(token => res.json({ token }))
            .catch(error => next(error))
    }
}


module.exports = new UserController();