import React, { useState, useContext } from 'react';
import './Shop.css';
import Catalog from '../../components/Catalog/Catalog';
import DeviceList from '../../components/DeviceList/DeviceList';
import { Context } from '../../context';

const Shop = () => {

    const {sections} = useContext(Context);
    
    const {types} = useContext(Context);
        
    const [devices, setDevices] = useState([
        {
            id: 1,
            name: "шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 ",
            price: 300,
            rating: 5,
            img:"",
            typeId: 2,
            sectionId: 2
        },
        {
            id: 2,
            name: "шрек 2",
            price: 300,
            rating: 5,
            img:"",
            typeId: 2,
            sectionId: 2
        },
        {
            id: 3,
            name: "шрек 3",
            price: 300,
            rating: 5,
            img:"",
            typeId: 2,
            sectionId: 2
        },
        {
            id: 4,
            name: "шрек 4",
            price: 300,
            rating: 5,
            img:"",
            typeId: 2,
            sectionId: 2
        }
        
    ]);

    return (
        <div className='shop_container'>
            <div className='shop'>
                <div className='shop_top'>
                    <Catalog sections={sections} types={types}></Catalog>
                </div>
                <div className='shop_bot'>
                    <DeviceList devices = {devices}>
                    </DeviceList>
                </div>
            </div>
        </div>
    );
};

export default Shop;