export async function nonAuthFetching(url, method = 'GET', body = null) {
    body = body ? JSON.stringify(body) : null
    const res = await fetch(`nds-shop/api/${url}`, {
        method: method,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        const data = await res.json()
        return data

}
export async function authFetching(url, method = 'GET', body = null) {
    body = body ? JSON.stringify(body) : null;
    const res = await fetch(`nds-shop/api/${url}`, {
        method: method, // GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:body 
    })
    const data = await res.json()
    return data;
}


/*
    /user/register - регистрация
    /user/login - авторизация
    /user/auth - проверка авторизован пользователь или нет
    /device/create - создание товара, нужна авторизация и роль ADMIN
    /device/getAll - получение всех товаров, либо отфильтрованных, без авторизации
    /device/:id - получение одного товара, без авторизации 
    /section/create - создание раздела, нужна авторизация и роль ADMIN
    /section/getAll - получение разделов, без авторизации
    /section/delete - удаление раздела, нужна авторизация и роль ADMIN
    /section/edit - изменение раздела, нужна авторизация и роль ADMIN
    /type/getAll - получение типов(подразделов), без авторизации
    /type/getAllId - получение типов(подразделов) одного раздела, без авторизации
    /type/create - создание типа(подраздела), нужна авторизация и роль ADMIN
    /type/edit - редактирование типа(подраздела), нужна авторизация и роль ADMIN
*/