import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import { authRoutes, publicRoutes } from '../../utils/routes';
import {SHOP_ROUTE} from '../../utils/consts';
import './AppRouter.css';


const AppRouter = ({isAuth}) => {
    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key = {path} path = {path} element = {<Component/>} exact/>
            )}
            <Route path = '*' element = {<Navigate to = {SHOP_ROUTE}/>}/>
        </Routes>
    );
};

export default AppRouter;