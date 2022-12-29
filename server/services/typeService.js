const connection = require('../db');
const ApiError = require('../Error/ApiError');

class TypeService {
    async create(body) {
        if (!body.name || isNaN(+body.sectionId) || !body.sectionId) {
            throw ApiError.badRequest('name or sectionId cannot be empty')
        }

        const isExistId = await connection.query("SELECT id FROM section WHERE id = ?", [body.sectionId])
        if (!isExistId[0][0]?.id) {
            throw ApiError.badRequest('sectionId not found')
        }
        const createdType = await connection.query("INSERT INTO type (name, sectionId) VALUES (?, ?)", [body.name, body.sectionId])
        return createdType;
    }

    async edit(body) {
        if (!body.newName || !body.id || !body.sectionId) {
            throw ApiError.badRequest('name cannot be empty')
        }

        const isExistNewName = await connection.query("SELECT name FROM type WHERE name = ?", [body.newName])

        if(isExistNewName[0][0]?.name) {
            throw ApiError.badRequest('name cannot be duplicate')
        }

        const isExistName = await connection.query("SELECT name FROM type WHERE id = ?", [body.id])

        if(!isExistName[0][0]?.name) {
            throw ApiError.badRequest('section not found')
        }

        const editedType = await connection.query("UPDATE type SET name = ?, sectionId = ? WHERE id = ? ", [body.newName, body.sectionId, body.id])
        return editedType;
    }

    async delete(body) {
        if (!body.id || isNaN(+body.id)) {
            throw ApiError.badRequest('id cannot be empty');
        }

        const isExistId = await connection.query("SELECT id FROM type WHERE id = ?", [body.id])

        if (!isExistId[0][0]?.id) {
            throw ApiError.badRequest('typeId not found')
        }
        const deletedType = await connection.query("DELETE FROM type WHERE id = ?", [body.id])
        return deletedType;
    }

    async getAllId(params) {
        const types = await connection.query("SELECT * FROM type WHERE sectionId = ?", [params.id])
        return types[0];
    }

    async getAll() {
        const types = await connection.query("SELECT * FROM type")
        return types[0];
    }
}

module.exports = new TypeService();