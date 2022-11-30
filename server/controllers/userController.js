const bcrypt = require('bcrypt');
const ApiError = require('../Error/ApiError');
const connection = require('../db');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest("некорректный пароль или логин"));

        }
        const isUser = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
        if (isUser[0][0]) {
            return next(ApiError.badRequest("Пользователь с данным email уже существует"));
        }
        const hashPassword = await bcrypt.hash(password, 7);
        const user = await connection.query(`INSERT INTO user (email, password, role) VALUES ("${email}", "${hashPassword}", "${role}")`);
        const userData = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
        const basket = await connection.query(`INSERT INTO basket (userId) VALUES (${userData[0][0].id})`);
        const token = jwt.sign(
            {
                id: userData[0][0].id,
                email: email,
                role: userData[0][0].role
            },
            config.get('SECRET_KEY'),
            { expiresIn: '1h' }
        );
        return res.json({token})
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
        if (!user[0][0]) {
            return next(ApiError.badRequest("Пользователь не найден"));
        }
        let comparePassword = bcrypt.compareSync(password, user[0][0].password);
        if (!comparePassword) {
            return next(ApiError.badRequest("Неверный пароль"));
        }
        const token = jwt.sign(
            {
                id: user[0][0].id,
                email: email,
                role: user[0][0].role
            },
            config.get('SECRET_KEY'),
            { expiresIn: '1h' }
        );
        return res.json({token});
    }

    async check(req, res, next) {
        const token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            },
            config.get('SECRET_KEY'),
            { expiresIn: '1h' }
        );
        return res.json({token});
    }
}


module.exports = new UserController();