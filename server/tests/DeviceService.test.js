const connection = require('../db');
const DeviceServise = require('../services/deviceService');

describe('create requests', () => {
    test('device/create корректные данные', async () => {
        const body = {
            name: "test device",
            price: 300,
            typeId: '225',
            sectionId: 1162
        };

        const response = await DeviceServise.create(body);
        expect(response[0]).toHaveProperty('insertId');
    })

    test('device/create дублирование имени', async () => {
        const body = {
            name: "test device",
            price: 300,
            typeId: '225',
            sectionId: 1162
        };

        await expect(DeviceServise.create(body))
            .rejects
            .toThrow('name cannot be duplicate');
    })

    test('device/create пустые свойства', async () => {
        const body = {
            name: "test device",
            price: 300,
            typeId: '',
            sectionId: 1162
        };

        await expect(DeviceServise.create(body))
            .rejects
            .toThrow('data cannot be empty');
    })

    test('device/create нечисловые значения id ', async () => {
        const body = {
            name: "test device",
            price: 300,
            typeId: 'text',
            sectionId: 1162
        };

        await expect(DeviceServise.create(body))
            .rejects
            .toThrow('incorrect data');
    })

    test('device/create нечисловые значения price ', async () => {
        const body = {
            name: "test device",
            price: '300text',
            typeId: '225',
            sectionId: 1162
        }

        await expect(DeviceServise.create(body))
            .rejects
            .toThrow('incorrect data');
    })

    afterAll(() => {
        connection.query('DELETE FROM device WHERE name = ?', ["test device"]);
        connection.end();
    })
})