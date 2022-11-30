import React from 'react';
import './DevicePage.css';

const DevicePage = () => {
    const device = {
        id: 1,
        name: "шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 шрек 1 ",
        price: 300,
        rating: 5,
        img: "",
        typeId: 2,
        sectionId: 2
    }
    const deviceInfo = [
        {
            id: 1,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 2,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 3,
            title: "семейное положение",
            description: "женат"
        },
        {
            id: 4,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 5,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 6,
            title: "семейное положение",
            description: "женат"
        },
        {
            id: 7,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 8,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 9,
            title: "семейное положение",
            description: "женат"
        },
        {
            id: 10,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 11,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 12,
            title: "семейное положение",
            description: "женат"
        },
        {
            id: 13,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 14,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 15,
            title: "семейное положение",
            description: "женат"
        },
        {
            id: 16,
            title: "Характер",
            description: "Вспыльчивый"
        },
        {
            id: 17,
            title: "цвет кожи",
            description: "болотно зеленый"
        },
        {
            id: 18,
            title: "семейное положение",
            description: "женат"
        }

    ]
    return (
        <div className='devicePage_container'>
            <div className='deviceItem'>
                <div className='deviceName'>
                    {device.name}
                </div>
                <div className='deviceRating'>
                    {"рейтинг: " + device.rating}
                </div>
                <div className='devicePrice'>
                    {"Цена: " + device.price + "руб."}
                </div>
                <img className='deviceImage' src='https://i.imgur.com/BbwjGTw.jpg' alt=" " />
            </div>
            <div className='deviceInfo'>
                {
                    deviceInfo.map((info) => {
                        return (
                            <div key={info.id} className='deviceInfoRow'>
                                <p>{info.title + ": "}</p>
                                <p>{info.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default DevicePage;