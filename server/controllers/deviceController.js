const connection = require('../db');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../Error/ApiError');

class DeviceController {
    async create(req, res, next) {
        /* Надо переделать, чтобы создание девайса и инфо к нему были независимы друг от друга */
        try {
            const { img } = req.files;
            let filename = uuid.v4() + ".jpg";
            const {name, price, sectionId, typeId, title, description} = req.body;
            img.mv(path.resolve(__dirname, '..', 'static', filename));
            connection.query("INSERT INTO device (name, price, sectionId, typeId, img) VALUES (?, ?, ?, ?, ?)", [name, price, sectionId, typeId, filename]);
            const deviceId = await connection.query(`SELECT id FROM device WHERE name = "${name}"`);
            let info = [title, description, deviceId[0][0].id]
            if (title) {
                connection.query(`INSERT INTO deviceInfo (title, description, deviceId) VALUES (?, ?, ?)`, info);
            }
        } catch (err) {
            next(ApiError.badRequest(err.message));
        }

    }
    async getAll(req, res) {
        /* Надо переделать*/
        let { sectionId, typeId, limit, page } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let limitDevices, devices;
        if (!sectionId && !typeId) {
            devices = await connection.query(`SELECT * FROM device`);
            limitDevices = await connection.query(`SELECT * FROM device LIMIT ${limit} OFFSET ${offset}`);
        }
        if (sectionId && typeId) {
            devices = await connection.query(`SELECT * FROM device WHERE sectionId = ${sectionId} AND typeId = ${typeId}`);
            limitDevices = await connection.query(`SELECT * FROM device WHERE sectionId = ${sectionId} AND typeId = ${typeId} LIMIT ${limit} OFFSET ${offset}`);
        }
        if (sectionId && !typeId) {
            devices = await connection.query(`SELECT * FROM device WHERE sectionId = ${sectionId}`);
            limitDevices = await connection.query(`SELECT * FROM device WHERE sectionId = ${sectionId} LIMIT ${limit} OFFSET ${offset}`);
        }
        if (!sectionId && typeId) {
            devices = await connection.query(`SELECT * FROM device WHERE typeId = ${typeId}`);
            limitDevices = await connection.query(`SELECT * FROM device WHERE typeId = ${typeId} LIMIT ${limit} OFFSET ${offset}`);
        }
        return res.json([[devices[0].length], limitDevices[0]]);
    }
    async getOne(req, res) {
        const {id} = req.params;
        let device = await connection.query(`SELECT * FROM device WHERE id = ${id}`);
        let deviceInfo = await connection.query(`SELECT * FROM deviceInfo WHERE deviceId = ${id}`);
        return res.json([device[0][0], deviceInfo[0][0]]);
    }
}

module.exports = new DeviceController();