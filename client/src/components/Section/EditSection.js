import React, { useState, useContext } from "react";
import './EditSection.css';
import { authFetching, nonAuthFetching } from "../../http/Index";
import { Context } from "../../context";

const EditSection = () => {
    const [sectionName, setSectionName] = useState('');
    const { sections, setSections, setTypes } = useContext(Context);


    const addSection = async () => {
        if (sectionName) {
            await authFetching('section/create', 'POST', { name: sectionName })
            setSectionName('');
        } else {
            alert("Поле не может быть пустым!")
        }
    }

    const deleteSection = async (id) => {
        await authFetching('section/delete', 'DELETE', { id: id });
    }

    const editSection = async (name) => {
        let newName = prompt('Редактировать', name);
        if (newName && name) {
            await authFetching('section/edit', 'PUT', { name: name, newName: newName });
        }
    }

    const getSections = async () => {
        return await nonAuthFetching('section/getAll');
    }


    return (
        <table>
            <tbody>
                <tr><th colSpan="2">разделы</th></tr>
                <tr>
                    <td>id</td>
                    <td>название</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>
                        <input
                            className="sectionName"
                            value={sectionName}
                            onChange={
                                (event) => setSectionName(event.target.value)}
                            placeholder="Введите название">
                        </input>
                    </td>
                    <td>
                        <button onClick={async () => {
                            await addSection();
                            const sections = await getSections();
                            setSections(sections);
                        }}>добавить</button>
                    </td>
                </tr>
                {sections.map(({ id, name }) =>
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{name}</td>
                        <td>
                            <button onClick={async () => {
                                await deleteSection(id);
                                const sections = await getSections();
                                setSections(sections);
                                const types = await nonAuthFetching('type/getAll');
                                setTypes(types);
                            }}>удалить</button>
                            <button onClick={async () => {
                                await editSection(name);
                                const sections = await getSections();
                                setSections(sections);
                            }}>редактировать</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default EditSection;