import React from "react";
import { useState } from "react";
import Modal from '../Modal/Modal';
import { SHOP_ROUTE, ADMIN_ROUTE } from '../../utils/consts';
import './HeaderStyle.css';
import Button from '../Button/Button'
import { useNavigate } from "react-router-dom";
import { nonAuthFetching, authFetching } from "../../http/Index";
import jwt_decode from 'jwt-decode';

const Header = ({ isAuth, setIsAuth }) => {

    const navigate = useNavigate();
    const [isModalActive, setIsModalActive] = useState(false);
    const [isLoginModal, setIsLoginModal] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const registration = async (email, password) => {
            const response = await nonAuthFetching('user/registration', 'POST', { email: email, password: password, role: 'USER' })
            if(response.token) {
                
                localStorage.setItem('token', response.token)
                setIsModalActive(false);
                setIsAuth(true);
                return jwt_decode(response.token)
            } else {
                alert(response.message)
            }
            
    }

    const login = async (email, password) => {
        const response = await nonAuthFetching('user/login', 'POST', { email: email, password: password })
        if (response.token) {
            localStorage.setItem('token', response.token)
            setIsAuth(true);
            setIsModalActive(false);
            return jwt_decode(response.token)
        } else {
            alert(response.message)
        }
    }

    const check = async () => {
        const response = await authFetching('user/auth', 'GET');
        if(response.token) {
            localStorage.setItem('token', response.token);
            return jwt_decode(response.token)
        }
    }

    return (
        <header>
            <div className="header_top">
                <div className="header_top_container">
                    <ul>
                        <li><a href="/">Текст один</a></li>
                        <li><a href="/">Текст два</a></li>
                        <li><a href="/">Текст три</a></li>
                        <li><a href="/">Текст четыре</a></li>
                    </ul>
                </div>
            </div>
            <div className="header_bot">
                <div className="header_bot_container">
                    <div className="logo_container">
                        <a href={SHOP_ROUTE} className="logo">NSD</a>
                    </div>
                    {isAuth ?
                        <div className="button_container">
                            <Button onClick={() => console.log('тут пока ничего нет')}>Корзина</Button>
                            <Button onClick={() => navigate(ADMIN_ROUTE)}>Админ</Button>
                            <Button onClick={() => {
                                localStorage.removeItem('token');
                                setIsAuth(false);
                                }}>Выйти</Button>
                        </div>
                        :
                        <div className="button_container">
                            <Button onClick={() => console.log('тут пока ничего нет')}>Корзина</Button>
                            <Button onClick={() => {
                                setIsModalActive(true);
                                setIsLoginModal(true);
                                setEmail('');
                                setPassword('');
                                setRepeatPassword('');
                            }
                            }
                            >Войти</Button>
                        </div>
                    }
                </div>
            </div>
            <Modal active={isModalActive} setActive={setIsModalActive}>
                {isLoginModal ?
                    <div className="login">
                        <h2>Авторизация</h2>
                        <input onChange={(event) => setEmail(event.target.value)} type={"email"} value={email} placeholder="email"></input>
                        <input onChange={(event) => setPassword(event.target.value)} type={"password"} value={password} placeholder="Пароль"></input>
                        <Button onClick={() => {
                            login(email, password);
                            setEmail('');
                            setPassword('');
                        }}>Войти</Button>
                        <p onClick={() => {
                            setIsLoginModal(false);
                            setEmail('');
                            setPassword('');
                        }}>Регистрация</p>
                        <a href="pass">Забыли пароль?</a>
                    </div>
                    :
                    <div className="register">
                        <h2>Регистрация</h2>
                        <input type={"email"} onChange={(event) => setEmail(event.target.value)} value={email} placeholder="email"></input>
                        <input type={"password"} onChange={(event) => setPassword(event.target.value)} value={password} placeholder="Пароль"></input>
                        <input type={"password"} onChange={(event) => setRepeatPassword(event.target.value)} value={repeatPassword} placeholder="Повторите пароль"></input>
                        <Button onClick={() => {
                            if (password === repeatPassword) {
                                registration(email, password);
                                setEmail('');
                                setPassword('');
                                setRepeatPassword('');
                            } else {
                                alert('Пароли не совпадают');
                            }

                        }}>Зарегистрироваться</Button>
                        <p onClick={() => {
                            setIsLoginModal(true);
                            setEmail('');
                            setPassword('');
                            setRepeatPassword('');
                        }}>Зарегистрированы? Авторизоваться</p>
                    </div>
                }
            </Modal>
        </header>
    );
};

export default Header;