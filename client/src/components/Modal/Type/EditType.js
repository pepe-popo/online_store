import React, { useContext, useState } from "react";
import { Context } from "../../../context";
import Modal from "../Modal";
import { authFetching, nonAuthFetching } from "../../../http/Index";
import './EditType.css';

const EditType = ({ active, setActive }) => {
    const { sections, types, setTypes } = useContext(Context);
    const [sectionId, setSectionId] = useState(null);
    const [typeName, setTypeName] = useState('')

    const addType = async () => {
        if (sectionId && typeName) {
            await authFetching('type/create', 'POST', { name: typeName, sectionId: sectionId });
            setTypeName('');
        } else {
            alert('Укажите название и выберите секцию');
        }
    }

    const editType = async (name) => {
        let newName = prompt('Редактировать', name);
        if(newName && name) {
            await authFetching('type/edit', 'PUT', { name: name, newName: newName });
        }
    }

    const deleteType = async (id) => {
        await authFetching('type/delete', 'DELETE', { id: id });
    }

    const getSections = async () => {
        return await nonAuthFetching('type/getAll');
    }


    return <Modal active={active} setActive={setActive}>
        <table>
            <tbody>
                <tr><th colSpan="3">подразделы</th></tr>
                <tr>
                    <td>id</td>
                    <td>название</td>
                    <td>раздел</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>
                        <input value={typeName} onChange={(event) => setTypeName(event.target.value)} className="typeName" placeholder="Введите название"></input>
                    </td>
                    <td>
                        <select
                            onChange={(event) => setSectionId(event.target.value)} className="sectionName">
                            <option>Выберите раздел</option>
                            {sections.map(({ id, name }) =>
                                <option value={id} key={id}>{name}</option>
                            )}
                        </select>
                    </td>
                    <td>
                        <button onClick={async () => {
                            await addType()
                            getSections('type/getAll')
                                .then(data => setTypes(data))
                        }}>Добавить</button>
                    </td>
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
                            <button onClick={async ()=>{
                               await editType(name)
                               getSections()
                                    .then(data => setTypes(data));
                            }}>Редактировать</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </Modal>
}

export default EditType;