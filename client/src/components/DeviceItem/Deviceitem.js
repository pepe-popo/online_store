import React from 'react';
import './Deviceitem.css';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../../utils/consts';

const Deviceitem = ({device})=> {
    const navigate = useNavigate();

    return (
        <div onClick={()=> navigate(DEVICE_ROUTE + "/" + device.id)} className='device_item_container'>
            <img src='https://www.pngall.com/wp-content/uploads/2/Shrek-PNG-Free-Image-180x180.png' alt=" "/>
            <div className='device_item_name'>
                {device.name}
            </div>
            <div className='device_item_rating'>
                {"Рейтинг:" + device.rating}
            </div>
            <div className='device_item_price'>
                {device.price + " руб."}
            </div>
        </div>
    )
}

export default Deviceitem;