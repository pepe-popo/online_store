const connection = require('../db');

class TypeService {
    async create(body) {
        if (!body.name || isNaN(+body.sectionId) || !body.sectionId) {
            throw new Error('name or sectionId cannot be empty')
        }

        const isExistId = await connection.query("SELECT id FROM section WHERE id = ?", [body.sectionId])
        if (!isExistId[0][0]?.id) {
            throw new Error('sectionId not found')
        }
        const createdType = await connection.query("INSERT INTO type (name, sectionId) VALUES (?, ?)", [body.name, body.sectionId])
        return createdType;
    }

    async edit(body) {
        if (!body.newName || !body.name) {
            throw new Error('name cannot be empty')
        }

        const isExistNewName = await connection.query("SELECT name FROM type WHERE name = ?", [body.newName])

        if(isExistNewName[0][0]?.name) {
            throw new Error('name taken')
        }

        const isExistName = await connection.query("SELECT name FROM type WHERE name = ?", [body.name])

        if(!isExistName[0][0]?.name) {
            throw new Error('name not found')
        }

        const editedType = await connection.query("UPDATE type SET name = ? WHERE name = ? ", [body.newName, body.name])
        return editedType;
    }

    async delete(body) {
        if (!body.id || isNaN(+body.id)) {
            throw new Error('id cannot be empty');
        }

        const isExistId = await connection.query("SELECT id FROM type WHERE id = ?", [body.id])

        if (!isExistId[0][0]?.id) {
            throw new Error('typeId not found')
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