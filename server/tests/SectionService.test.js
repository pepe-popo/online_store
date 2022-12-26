const connection = require('../db');
const SectionService = require('../services/sectionService');

describe('get section requests', () => {
    test('/section/getAll', async () => {
        const response = await SectionService.getAll();

        response.forEach((item) => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
        })
    })

})

describe('/section/create', () => {

    test('/section/create корректные данные', async () => {
        const body = { name: 'Тестовое название' };
        const response = await SectionService.create(body);
        expect(response[0]).toHaveProperty('insertId');
    })

    test('/section/create некорректные данные', async () => {
        const body = { name: '' };
        await expect(SectionService.create(body))
            .rejects
            .toThrow('name cannot be empty')
    })

    test('/section/create такое название уже существует', async () => {
        const body = { name: 'Тестовое название' };
        await expect(SectionService.create(body))
            .rejects
            .toThrow('name cannot be duplicate');
    })

    afterAll(async () => {
        await connection.query('DELETE FROM section WHERE name = ?', ['Тестовое название']);
    })

})

describe('/section/delete', () => {

    test('section/delete корректный id', async () => {
        const response = await connection.query("INSERT INTO section (name) VALUES (?)", ['для удаления']);
        const body = { id: response[0].insertId };
        res = await SectionService.delete(body);
        expect(res[0]).toHaveProperty('affectedRows', 1);
    })

    test('section/delete некорректный id или его отсутствие', async () => {
        const body = { name: 'test' };
        await expect(SectionService.delete(body))
            .rejects
            .toThrow('id cannot be empty');

    })

    test('section/delete некорректный id или его отсутствие', async () => {
        const body = { name: '' };
        await expect(SectionService.delete(body))
            .rejects
            .toThrow('id cannot be empty');

    })

    afterAll(async () => {
        await connection.query('DELETE FROM section WHERE name = ?', ['для удаления']);
    })
})
describe('/section/edit', () => {

    test('section/edit корректные данные', async () => {
        const body = { id: 1162, newName: 'измененный раздел' };
        const response = await SectionService.edit(body);
        expect(response[0]).toHaveProperty('info', 'Rows matched: 1  Changed: 1  Warnings: 0');
    })

    test('section/edit некорректные данные', async () => {
        const body = { name: '', name2: 'test' };
        await expect(SectionService.edit(body))
            .rejects
            .toThrow('id cannot be empty');
    })

    test('section/edit занятое новое название', async () => {
        await connection.query("INSERT INTO section (name) VALUES (?)", ['занятое название']);
        const body = { id:1162, newName: 'занятое название' }
        await expect(SectionService.edit(body))
            .rejects
            .toThrow('name taken');
    })

    test('section/edit несуществующий раздел', async () => {
        const body = { id: 0, newName: 'coolName' };
        await expect(SectionService.edit(body))
            .rejects
            .toThrow('section not found');
    })

    afterAll(async () => {
        await connection.query('UPDATE section SET name = "Тестовый раздел" WHERE id = 1162');
        await connection.query('DELETE FROM section WHERE name = ?', ['измененный раздел']);
        await connection.query('DELETE FROM section WHERE name = ?', ['занятое название']);
        await connection.end();
    })
}
)