import React, { useState, useContext } from 'react';
import './Shop.css';
import Tabs from '../../components/Tabs/Tabs';
import DeviceList from '../../components/DeviceList/DeviceList';
import { Context } from '../../context';

const Shop = () => {

    const {sections} = useContext(Context);
    
    const [types, setTypes] = useState([
        {
            id: 1,
            name: 'Samsung',
            sectionId: 2
        },
        {
            id: 2,
            name: 'Apple',
            sectionId: 2
        },
        {
            id: 3,
            name: 'Xiaomi',
            sectionId: 2
        },
        {
            id: 4,
            name: 'Nokia',
            sectionId: 2
        },
        {
            id: 6,
            name: 'intel',
            sectionId: 1
        },
        {
            id: 7,
            name: 'AMD',
            sectionId: 1
        },
        {
            id: 8,
            name: 'NVIDIA',
            sectionId: 1
        },
        {
            id: 9,
            name: 'intel',
            sectionId: 1
        },
        {
            id: 10,
            name: 'AMD',
            sectionId: 1
        },
        {
            id: 11,
            name: 'NVIDIA',
            sectionId: 1
        },
        {
            id: 12,
            name: 'intel',
            sectionId: 1
        },
        {
            id: 13,
            name: 'AMD',
            sectionId: 1
        },
        {
            id: 14,
            name: 'NVIDIA',
            sectionId: 1
        },
        {
            id: 15,
            name: 'intel',
            sectionId: 1
        },
        {
            id: 16,
            name: 'AMD',
            sectionId: 1
        },
        {
            id: 17,
            name: 'NVIDIA',
            sectionId: 1
        },
        {
            id: 18,
            name: 'intel',
            sectionId: 1
        },
        {
            id: 19,
            name: 'AMD',
            sectionId: 1
        },
        {
            id: 20,
            name: 'NVIDIA',
            sectionId: 1
        }
    ]);
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
                    <Tabs sections={sections} types={types}></Tabs>
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