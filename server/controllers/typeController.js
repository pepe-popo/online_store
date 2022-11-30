const connection = require('../db');

class TypeController {
    async create(req, res) {
        await connection.query("INSERT INTO type (name) VALUES (?)", [req.body.name]);
    }
    async getAll(req, res) {
        const types = await connection.query("SELECT * FROM type");
        return res.json(types[0]);
    }
}

module.exports = new TypeController();