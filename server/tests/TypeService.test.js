const TypeService = require('../services/typeService');
const connection = require('../db');



describe('create requests', () => {

    test('type/create', async () => {
        const data = await connection.query('INSERT INTO section (name) VALUES (?)', ['test section']);
        const { insertId } = data[0];
        const body = { name: 'test type', sectionId: insertId };

        const response = await TypeService.create(body);
        expect(response[0]).toHaveProperty('insertId', response[0].insertId);
    })

    test('type/create некорректные данные', async () => {
        const body = { name: '', sectionId: 123 };
        await expect(TypeService.create(body))
            .rejects
            .toThrow('name or sectionId cannot be empty');
    })

    test('type/create некорректные данные', async () => {
        const body = { name: 'test type2', sectionId: 'asd1' };
        await expect(TypeService.create(body))
            .rejects
            .toThrow('name or sectionId cannot be empty');
    })


    test('type/create некорректный sectionid', async () => {
        const body = { name: 'test type3', sectionId: 1 };
        await expect(TypeService.create(body))
            .rejects
            .toThrow('sectionId not found');
    })

    test('type/create некорректный sectionid', async () => {
        const body = { name: 'test type4', sectionId: '' };
        await expect(TypeService.create(body))
            .rejects
            .toThrow('name or sectionId cannot be empty');
    })

    afterAll(() => {
        connection.query('DELETE FROM type WHERE name = ?', ['test type']);
        connection.query('DELETE FROM type WHERE name = ?', ['test type2']);
        connection.query('DELETE FROM type WHERE name = ?', ['test type3']);
        connection.query('DELETE FROM type WHERE name = ?', ['test type4']);
        connection.query('DELETE FROM section WHERE name = ?', ['test section']);
    })
})

describe('delete requests', () => {

    test('type/delete корректные данные', async () => {
        const data = await connection.query('INSERT INTO section (name) VALUES (?)', ['test section']);
        const { insertId } = data[0];
        const response = await connection.query('INSERT INTO type (name, sectionId) VALUES(?, ?)', ['test type', insertId]);
        const body = {id:response[0].insertId};
        const res = await TypeService.delete(body);
        expect(res[0]).toHaveProperty('affectedRows', 1);
    })

    test('type/delete некорректные данные', async()=> {
        const body = {id:''};
        await expect(TypeService.delete(body))
        .rejects
        .toThrow('id cannot be empty');
    })

    test('type/delete id нет в базе', async()=>{
        const body = {id:1};
        await expect(TypeService.delete(body))
        .rejects
        .toThrow('typeId not found');
    })

    afterAll(()=> {
        connection.query('DELETE FROM type WHERE name = ?', ['test type']);
        connection.query('DELETE FROM section WHERE name = ?', ['test section']);
    })

})

describe('edit requests', ()=> {

    test('type/edit корректные данные', async()=> {
        const data = await connection.query('INSERT INTO section (name) VALUES (?)', ['test section']);
        const { insertId } = data[0];
        await connection.query('INSERT INTO type (name, sectionId) VALUES(?, ?)', ['test type', insertId]);
        const body = {name:'test type', newName:'test new name'};
        const response = await TypeService.edit(body);
        expect(response[0]).toHaveProperty('info', 'Rows matched: 1  Changed: 1  Warnings: 0');
    })

    test('type/edit некорректные данные', async()=> {
        const body = {incorrectName:'incorrect'};
        await expect(TypeService.edit(body))
        .rejects
        .toThrow('name cannot be empty');
    })

    test('type/edit некорректные данные', async()=> {
        const body = {name:'', newName:'ss'};
        await expect(TypeService.edit(body))
        .rejects
        .toThrow('name cannot be empty');
    })

    test('type/edit newName занят', async()=> {
        const body = {name:'test', newName:'test new name'}
        await expect(TypeService.edit(body))
        .rejects
        .toThrow('name taken');
    })

    test('type/edit name отсутствует в базе', async()=> {
        const body = {name:'404', newName:'cool name'};
        await expect(TypeService.edit(body))
        .rejects
        .toThrow('name not found');
    })

    afterAll(()=> {
        connection.query('DELETE FROM type WHERE name = ?', ['test type']);
        connection.query('DELETE FROM section WHERE name = ?', ['test section']);
    })
})

describe('get requests', () => {

    test('type/getAll', async () => {
        const response = await TypeService.getAll();

        response.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('sectionId');
        });
    })

    test('type/getAllId', async () => {
        const response = await TypeService.getAllId({ id: 112 });
        response.forEach(item => {
            expect(item).toHaveProperty('id');
            expect(item).toHaveProperty('name');
            expect(item).toHaveProperty('sectionId', 112);
        });
    })

    afterAll(() => {
        connection.end();
    })
})

