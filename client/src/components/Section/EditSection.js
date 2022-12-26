import React, { useState, useContext } from "react";
import './EditSection.css';
import { authFetching, nonAuthFetching } from "../../http/Index";
import { Context } from "../../context";

const EditSection = () => {
    const [sectionName, setSectionName] = useState('');
    const [newName, setNewName] = useState('');
    const [mutableSectionId, setMutableSectionId] = useState(null);
    const [isEditActive, setIsEditActive] = useState(false);
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

    const editSection = async (id) => {
        if (newName && id) {
            await authFetching('section/edit', 'PUT', { id: id, newName: newName });
        }
    }

    const getSections = async () => {
        return await nonAuthFetching('section/getAll');
    }


    return (
        <div className="editSection_container">
            {isEditActive ?
                <div className="editSection">
                    <input
                        className="editName"
                        value={newName}
                        onChange={
                            (event) => setNewName(event.target.value)}
                    >
                    </input>

                    <button onClick={async () => {
                        await editSection(mutableSectionId);
                        const sections = await getSections();
                        setSections(sections);
                    }}>сохранить
                    </button>

                    <button onClick={async () => {
                        setIsEditActive(false);
                        setMutableSectionId(null);
                        
                    }}>отменить
                    </button>
                </div>
                :
                <div className="addSection">
                    <input
                        className="sectionName"
                        value={sectionName}
                        onChange={
                            (event) => setSectionName(event.target.value)}
                        placeholder="Введите название">
                    </input>

                    <button onClick={async () => {
                        await addSection();
                        const sections = await getSections();
                        setSections(sections);
                    }}>добавить
                    </button>
                </div>
            }
            <table className="sectionTable">
                <tbody>
                    <tr><th colSpan="2">разделы</th></tr>
                    <tr>
                        <td>id</td>
                        <td>название</td>
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
                            </td>
                            <td>
                                <button onClick={async () => {
                                    setIsEditActive(true);
                                    setMutableSectionId(id);
                                    setNewName(name)
                                }}>редактировать</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default EditSection;