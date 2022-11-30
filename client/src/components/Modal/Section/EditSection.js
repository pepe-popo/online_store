import React, { useState, useEffect } from "react";
import Modal from "../Modal";
import './EditSection.css';
import { authFetching, nonAuthFetching } from "../../../http/Index";

const EditSection = ({ active, setActive }) => {
    const [sectionName, setSectionName] = useState('');
    const [sections, setSections] = useState([]);


    const addSection = async () => {
        if (sectionName) {
            await authFetching('section/create', 'POST', { name: sectionName });
        } else {
            alert("Поле не может быть пустым!")
        }
    }

    const deleteSection = async (id) => {
        await authFetching('section/delete', 'DELETE', { id: id });
    }

    const editSection = async (name) => {
        let newName = prompt('Редактировать', name);
        await authFetching('section/edit', 'PATCH', { name: name, newName: newName });
    }

    const getSections = async () => {
        return await nonAuthFetching('section/getAll');
    }

    useEffect(() => {
        getSections()
            .then(data => setSections(data));
    }, [])

    return <Modal active={active} setActive={setActive}>
        <table>
            <tbody>
                <tr><th colSpan="2">разделы</th></tr>
                <tr>
                    <td>id</td>
                    <td>название</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td><input value={sectionName} onChange={(event) => setSectionName(event.target.value)} placeholder="Введите название"></input></td>
                    <td><button onClick={async () => {
                        setSectionName('');
                        await addSection()
                        await getSections()
                            .then(data => setSections(data));
                    }}>добавить</button></td>
                </tr>
                {sections.map(({ id, name }) =>
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>
                            <button onClick={async () => {
                                await deleteSection(id)
                                await getSections()
                                    .then(data => setSections(data));
                            }}>удалить</button>
                            <button onClick={async () => {
                                await editSection(name);
                                await getSections()
                                    .then(data => setSections(data));
                            }}>редактировать</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </Modal>
}

export default EditSection;