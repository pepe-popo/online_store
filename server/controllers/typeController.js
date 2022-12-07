const connection = require('../db');

class TypeController {
    async create(req, res, next) {
        await connection.query("INSERT INTO type (name, sectionId) VALUES (?, ?)", [req.body.name, req.body.sectionId])
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }

    async edit(req, res, next) {
        await connection.query("UPDATE type SET name = ? WHERE name = ? ", [req.body.newName, req.body.name])
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }

    async delete(req, res, next) {
        await connection.query("DELETE FROM type WHERE id = ?", [req.body.id])
            .then(data => res.json(data))
            .catch(error => res.status(500).json(error))
    }

    async getAllId(req, res, next) {
        const types = await connection.query("SELECT * FROM type WHERE sectionId = ?", [req.params.id])
            .catch(error => console.log(error))
        return res.json(types[0])
    }

    async getAll(req, res, next) {
        const types = await connection.query("SELECT * FROM type")
            .catch(error => console.log(error));
        return res.json(types[0]);
    }
}

module.exports = new TypeController();