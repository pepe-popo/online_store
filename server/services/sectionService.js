const connection = require('../db');

class SectionService {
    async create(body) {
        if (body.name.length < 1) {
            throw new Error('Название не может быть пустым')
        }
        const createdSection = await connection.query("INSERT INTO section (name) VALUES (?)", [body.name])
        return createdSection;
    };

    async delete(body) {
        const deletedSection = await connection.query("DELETE FROM section WHERE id = ?", [body.id])
        return deletedSection;
    }

    async edit(body) {
        if (!body.newName || !body.name) {
            throw new Error('Название не может быть пустым')
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