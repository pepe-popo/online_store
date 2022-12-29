const connection = require('../db');
const ApiError = require('../Error/ApiError')

class DeviceService {

    async create(body) {
        if(!body.name || !body.price || !body.typeId || !body.sectionId) {
            throw ApiError.badRequest('data cannot be empty');
        }

        if(isNaN(+body.price) || isNaN(+body.typeId) || isNaN(+body.sectionId)) {
            throw ApiError.badRequest('incorrect data');
        }

        const isDuplicateName = await connection.query('SELECT name FROM device WHERE name = ?', [body.name]);
        if(isDuplicateName[0][0]) {
            throw ApiError.badRequest('name cannot be duplicate');
        }

        const response = await connection.query('INSERT INTO device (name, price, typeId, sectionId) VALUES (?, ?, ?, ?)', [body.name, body.price, body.typeId, body.sectionId])
        return response;
    }
}

module.exports = new DeviceService();