const bcrypt = require('bcrypt');
const connection = require('../db');
const jwt = require('jsonwebtoken');
const config = require('config');

class UserService {
    async registration(body) {
        const { email, password } = body;
        let role = body.role? body.role : 'USER';
        if (!email || !password) {
            throw new Error('Неверный логин или пароль')
        }
        if(!/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g.test(password)){
            throw new Error('Пароль слишком простой');
        }
        const isUser = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
        if (isUser[0][0]) {
            throw new Error('email занят');
        }
        const hashPassword = await bcrypt.hash(password, 7);
        await connection.query(`INSERT INTO user (email, password, role) VALUES ("${email}", "${hashPassword}", "${role}")`);
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
        return token
    }

    async login(body) {
        const { email, password } = body;
        if(!email || !password) {
            throw new Error('Неверный логин или пароль')
        }
        const user = await connection.query(`SELECT * FROM user WHERE email = "${email}"`);
        if (!user[0][0]) {
            throw new Error('Неверный логин или пароль')
        }
        let comparePassword = bcrypt.compareSync(password, user[0][0].password);
        if (!comparePassword) {
            throw new Error('Неверный логин или пароль')
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
        return token;
    }

    async check(req) {
        const token = jwt.sign(
            {
                id: req.user.id,
                email: req.user.email,
                role: req.user.role
            },
            config.get('SECRET_KEY'),
            { expiresIn: '1h' }
        );
        return token;
    }
}

module.exports = new UserService();