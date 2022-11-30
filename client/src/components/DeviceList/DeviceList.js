import React from 'react';
import Deviceitem from '../DeviceItem/Deviceitem';
import './DeviceList.css';

const DeviceList = ({devices}) => {
    return (
        <div className='device_list'>
            {devices.map((device) =>
             <Deviceitem key={device.id} device = {device}/>
            )}
        </div>
    )
}

export default DeviceList;