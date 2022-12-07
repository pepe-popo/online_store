const connection = require('../db');

class TypeService {
    async create(body) {
        if (body.name.length < 1) {
            throw new Error('Название не может быть пустым')
        }
        const createdType = await connection.query("INSERT INTO type (name, sectionId) VALUES (?, ?)", [body.name, body.sectionId])
        return createdType;
    }

    async edit(body) {
        if (!body.newName || !body.name){
            throw new Error('Название не может быть пустым')
        }
            const editedType = await connection.query("UPDATE type SET name = ? WHERE name = ? ", [body.newName, body.name])
            return editedType;
    }

    async delete(body) {
        if(!body.id) {
            throw new Error('Поле id не может быть пустым');
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