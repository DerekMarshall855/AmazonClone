import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import CartPage from '../Pages/CartPage';
import DashboardPage from '../Pages/DashboardPage';
import HomePage from '../Pages/HomePage';
import OrderDetailsPage from '../Pages/OrderDetailsPage';
import OrderHistoryPage from '../Pages/OrderHistoryPage';
import OrderListPage from '../Pages/OrderListPage';
import PaymentMethodPage from '../Pages/PaymentMethodPage';
import PlaceOrderPage from '../Pages/PlaceOrderPage';
import ProductListPage from '../Pages/ProductListPage';
import ProductPage from '../Pages/ProductPage';
import ProfilePage from '../Pages/ProfilePage';
import RegisterPage from '../Pages/RegisterPage';
import ShippingAddressPage from '../Pages/ShippingAddressPage';
import SigninPage from '../Pages/SigninPage';
import UserListPage from '../Pages/UserListPage';
import AdminRoute from './AdminRoute';
import PrivateRoute from './PrivateRoute';

function Main(): ReactElement | null {
    return (
        <main>
            <Route path="/cart/:id?" component={CartPage}></Route>
            <Route path="/product/:id" component={ProductPage}></Route>
            <Route path="/signin" component={SigninPage}></Route>
            <Route path="/register" component={RegisterPage}></Route>
            <Route path="/shipping" component={ShippingAddressPage}></Route>
            <Route path="/payment" component={PaymentMethodPage}></Route>
            <Route path="/placeorder" component={PlaceOrderPage}></Route>
            <Route path="/order/:id" component={OrderDetailsPage}></Route>
            <Route path="/orderhistory" component={OrderHistoryPage}></Route>
            <PrivateRoute path="/profile" component={ProfilePage}></PrivateRoute>
            <AdminRoute path="/dashboard" component={DashboardPage}></AdminRoute>
            <AdminRoute path="/productlist" component={ProductListPage}></AdminRoute>
            <AdminRoute path="/orderlist" component={OrderListPage}></AdminRoute>
            <AdminRoute path="/userlist" component={UserListPage}></AdminRoute>
            <Route path="/" component={HomePage} exact></Route>
        </main>
    );
}


export default Main;