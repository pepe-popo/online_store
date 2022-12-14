const connection = require('../db');
const ApiError = require('../Error/ApiError');

class SectionService {
    async create(body) {
        if (!body.name) {
            throw ApiError.badRequest('name cannot be empty');
        }
        const isDuplicateName = await connection.query("SELECT * FROM section WHERE name = ?", body.name);
        if (isDuplicateName[0][0]) {
            throw ApiError.badRequest('name cannot be duplicate');
        }
        const createdSection = await connection.query("INSERT INTO section (name) VALUES (?)", [body.name]);
        return createdSection;
    };

    async delete(body) {
        if (!body.id || isNaN(+body.id)) {
            throw ApiError.badRequest('id cannot be empty')
        }
        const deletedSection = await connection.query("DELETE FROM section WHERE id = ?", [body.id]);
        return deletedSection;
    }

    async edit(body) {
        if (!body.newName || isNaN(+body.id)) {
            throw ApiError.badRequest('id cannot be empty');
        }

        const isDuplicateName = await connection.query("SELECT * FROM section WHERE name = ?", body.newName);
        if (isDuplicateName[0][0]) {
            throw ApiError.badRequest('name cannot be duplicate');
        }

        const isExistName = await connection.query("SELECT * FROM section WHERE id = ?", body.id);
        if (!isExistName[0][0]) {
            throw ApiError.badRequest('section not found');
        }

        const editedSection = await connection.query("UPDATE section SET name = ? WHERE id = ? ", [body.newName, body.id]);
        return editedSection;
    }
    async getAll() {
        const sections = await connection.query("SELECT * FROM section");
        return sections[0];
    }
}

module.exports = new SectionService();