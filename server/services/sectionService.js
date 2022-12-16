const connection = require('../db');

class SectionService {
    async create(body) {
        if (!body.name) {
            throw new Error('name cannot be empty');
        }
        const isDuplicateName = await connection.query("SELECT * FROM section WHERE name = ?", body.name);
        if (isDuplicateName[0][0]) {
            throw new Error('name cannot be duplicate');
        }
        const createdSection = await connection.query("INSERT INTO section (name) VALUES (?)", [body.name]);
        return createdSection;
    };

    async delete(body) {
        if (!body.id) {
            throw new Error('id cannot be empty')
        }
        const deletedSection = await connection.query("DELETE FROM section WHERE id = ?", [body.id])
        return deletedSection;
    }

    async edit(body) {
        if (!body.newName || !body.name) {
            throw new Error('name cannot be empty')
        }

        const isDuplicateName = await connection.query("SELECT * FROM section WHERE name = ?", body.newName);
        if (isDuplicateName[0][0]) {
            throw new Error('name taken')
        }

        const isExistName = await connection.query("SELECT * FROM section WHERE name = ?", body.name);
        if (!isExistName[0][0]) {
            throw new Error('name not found')
        }

        const editedSection = await connection.query("UPDATE section SET name = ? WHERE name = ? ", [body.newName, body.name])
        return editedSection;
    }
    async getAll() {
        const sections = await connection.query("SELECT * FROM section");
        return sections[0]
    }
}

module.exports = new SectionService();