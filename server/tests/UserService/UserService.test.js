const UserService = require('../../services/userService');
const connection = require('../../db');

describe('registration', () => {
    test('Корректные значения при регистрации', async () => {
        const body = { email: 'Test@test.ru', password: 'TLd0smZNdr9cm!' }
        const response = await UserService.registration(body);
        expect(response).toMatch(/(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/)

    })

    test('Простой пароль при регистрации', async ()=> {
        const body = { email: 'Test2@test.ru', password: '123' }
        await expect(UserService.registration(body))
        .rejects
        .toThrow('Пароль слишком простой')
    })

    test('нет свойств email и password при регистрации', async () => {
        const body = { someStr: 'qwe' }
        await expect(UserService.registration(body))
        .rejects
        .toThrow('Неверный логин или пароль')
    })

    test('email занят при регистрации', async ()=> {
        const body = {email:'forTest@hehe', password:'TLd0smZNdr9cm!'}
        await expect(UserService.registration(body))
        .rejects
        .toThrow('email занят')
    })

    test('пустой body при регистрации', async ()=> {
        const body = {}
        await expect(UserService.registration(body))
        .rejects
        .toThrow('Неверный логин или пароль')
    })

    afterAll(() => {
        connection.query('DELETE FROM user WHERE email = ?', ['Test@test.ru'])
    })
})

describe('login', ()=> {
    test('корректные значения при логине', async ()=> {
        const body = { email: 'forTests@hehe', password: '1234567' }
        const response = await UserService.login(body);
        expect(response).toMatch(/(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/)
    })

    test('пустой body при логине', async ()=> {
        const body = {}
        await expect(UserService.login(body))
        .rejects
        .toThrow('Неверный логин или пароль')
    })

    test('несуществующий email при логине', async ()=>{
        const body = {email:'asuidfaiuhsdf8ah@123', password:'asdasd'}
        await expect(UserService.login(body))
        .rejects
        .toThrow('Неверный логин или пароль')
    })

    test('Неправильный пароль при логине', async ()=> {
        const body = { email: 'forTests@hehe', password: '12345678' }
        await expect(UserService.login(body))
        .rejects
        .toThrow('Неверный логин или пароль')
    })
    afterAll(()=> {
        connection.end()
    })
})