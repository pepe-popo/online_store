const connection = require('../db');

class SectionController {
    async create(req, res, next) {
       const response = await connection.query("INSERT INTO section (name) VALUES (?)", [req.body.name])
        .catch(error => console.log(error))
        res.json(response)
    };

    async delete(req, res, next) {
        const response = await connection.query("DELETE FROM section WHERE id = ?", [req.body.id])
        .catch(error => console.log(error))
        return res.json(response);
    }

    async edit(req, res, next) {
        const response = await connection.query("UPDATE section SET name = ? WHERE name = ? ", [req.body.newName, req.body.name])
        .catch(error => console.log(error))
        return res.json(response);
    }
    async getAll(req, res) {

        const sections = await connection.query("SELECT * FROM section");
        return res.json(sections[0]);
    }
}

module.exports = new SectionController();