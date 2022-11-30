import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import EditDevice from '../../components/Modal/EditDevice/EditDevice';
import './Admin.css';
import EditSection from '../../components/Modal/Section/EditSection';
import EditType from '../../components/Modal/Type/EditType';

const Admin = () => {
    const [isDeviceActive, setIsDeviceActive] = useState(false);
    const [isSectionActive, setSectionActive] = useState(false);
    const [isTypeActive, setTypeActive] = useState(false);
    

    return (
        <div className='admin_container'>
            <div className='buttons_container'>
                <Button onClick={()=> setSectionActive(true)}>Разделы</Button>
                <Button onClick={()=> setTypeActive(true)}>Типы</Button>
                <Button onClick={()=> setIsDeviceActive(true)}>Устройства</Button>
            </div>
            <EditDevice active={isDeviceActive} setActive={setIsDeviceActive}/>
            <EditSection active={isSectionActive} setActive={setSectionActive}/>
            <EditType active={isTypeActive} setActive={setTypeActive}/>
        </div>
    );
};

export default Admin;