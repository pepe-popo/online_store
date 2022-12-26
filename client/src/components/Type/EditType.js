import React, { useContext, useState } from "react";
import { Context } from "../../context";
import { authFetching, nonAuthFetching } from "../../http/Index";
import './EditType.css';

const EditType = () => {
    const [sectionId, setSectionId] = useState(null);
    const [typeName, setTypeName] = useState('')
    const [isEditActive, setIsEditActive] = useState(false);
    const [newName, setNewName] = useState('');
    const [mutableTypeId, setMutableTypeId] = useState(null);
    const [mutableSectionId, setMutableSectionId] = useState(null);
    const { sections, types, setTypes } = useContext(Context);

    const addType = async () => {
        if (sectionId && typeName) {
            await authFetching('type/create', 'POST', { name: typeName, sectionId: sectionId });
            setTypeName('');
        } else {
            alert('Укажите название и выберите секцию');
        }
    }

    const editType = async (typeId, sectionId, newName) => {
        if (newName && typeId && sectionId) {
            await authFetching('type/edit', 'PUT', { id: typeId, newName: newName, sectionId: sectionId });
        }
    }

    const deleteType = async (id) => {
        await authFetching('type/delete', 'DELETE', { id: id });
    }

    const getSections = async () => {
        return await nonAuthFetching('type/getAll');
    }


    return (
        <div className="editType_container">
            {isEditActive ?
                <div className="editType">
                    <input
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                        className="typeName">
                    </input>
                    <select
                        onChange={(event) => setMutableSectionId(event.target.value)} className="sections">
                        <option>Выберите раздел</option>
                        {sections.map(({ id, name }) =>
                            <option value={id} key={id}>{name}</option>
                        )}
                    </select>
                    <button onClick={async () => {
                        await editType(mutableTypeId, mutableSectionId, newName);
                        const types = await getSections('type/getAll');
                        setTypes(types);
                        setIsEditActive(false)
                    }}>сохранить
                    </button>
                    <button onClick={() => {
                        setIsEditActive(false);
                        setMutableTypeId(null)
                        setMutableSectionId(null);
                    }}>отменить
                    </button>
                </div>
                :
                <div className="addType">
                    <input
                        value={typeName}
                        onChange={(event) => setTypeName(event.target.value)}
                        className="typeName"
                        placeholder="Введите название">
                    </input>

                    <select
                        onChange={(event) => setSectionId(event.target.value)} className="sections">
                        <option>Выберите раздел</option>
                        {sections.map(({ id, name }) =>
                            <option value={id} key={id}>{name}</option>
                        )}
                    </select>

                    <button onClick={async () => {
                        await addType()
                        const types = await getSections('type/getAll')
                        setTypes(types)
                    }}>Добавить
                    </button>
                </div>}
            <table className="typeTable">
                <tbody>
                    <tr><th colSpan="3">подразделы</th></tr>
                    <tr>
                        <td>id</td>
                        <td>название</td>
                        <td>раздел</td>
                    </tr>
                    {types.sort((a, b) => {
                        return a.sectionId - b.sectionId
                    }).map(({ name, id, sectionId }) =>
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>
                                {sections.find((section) =>
                                    section.id === sectionId
                                )?.name} {/*без проверки на наличие name, при удалении раздела фронт падает*/}
                            </td>
                            <td>
                                <button onClick={async () => {
                                    await deleteType(id)
                                    getSections()
                                        .then(data => setTypes(data));
                                }}>Удалить</button>
                            </td>
                            <td>
                                <button onClick={async () => {
                                    setIsEditActive(true);
                                    setMutableTypeId(id);
                                    setNewName(name);
                                }}>Редактировать</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )

}

export default EditType;