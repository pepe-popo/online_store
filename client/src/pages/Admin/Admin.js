import React from 'react';
import './Admin.css';
import Tabs from '../../components/Tabs/Tabs';
import EditSection from '../../components/Section/EditSection';
import EditType from '../../components/Type/EditType';
import EditDevice from '../../components/EditDevice/EditDevice';


const Admin = () => {

    const items = [
        { title: 'Разделы', content: EditSection() },
        { title: 'Подразделы', content: EditType() },
        { title: 'Товары', content: EditDevice() }
    ];

    return (
        <div className='admin_container'>
            <Tabs items={items} />
        </div>
        
    );

}


export default Admin;