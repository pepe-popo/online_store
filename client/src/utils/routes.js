import Admin from '../pages/Admin/Admin';
import Basket from '../pages/Basket';
import Shop from '../pages/Shop/Shop';
import DevicePage from '../pages/DevicePage/DevicePage';
import { DEVICE_ROUTE,  ADMIN_ROUTE, BASKET_ROUTE, SHOP_ROUTE } from './consts';

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }

];

export const publicRoutes = [
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    }

];