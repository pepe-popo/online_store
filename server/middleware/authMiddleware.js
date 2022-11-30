const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Пользователь не авторизован" })
        }
        const decoded = jwt.verify(token, config.get("SECRET_KEY"));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Вы не авторизованы" });
    }
}