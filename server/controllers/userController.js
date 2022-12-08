const ApiError = require('../Error/ApiError');
const jwt = require('jsonwebtoken');
const config = require('config');
const UserService = require('../services/userService.js');

class UserController {
    async registration(req, res, next) {
        await UserService.registration(req.body)
        .then(token => res.json({token}))
        .catch(error => next(ApiError.badRequest(error.message)))
    }

    async login(req, res, next) {
        await UserService.login(req.body)
        .then(token => res.json({token}))
        .catch(error => next(ApiError.badRequest(error.message)));
    }

    async check(req, res, next) {
        await UserService.check(req)
        .then(token => res.json({token}))
        .catch(error => res.status(500).json(error.message))
    }
}


module.exports = new UserController();