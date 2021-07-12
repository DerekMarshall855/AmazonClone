import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './Reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './Reducers/orderReducers';
import { productDetailsReducer, productListReducer } from './Reducers/productReducers';
import { userDetailsReducer, userRegisterReducer, userSigninReducer, userUpdateProfileReducer } from './Reducers/userReducers';

const initialState : any = {
    userSignin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(String(localStorage.getItem('userInfo'))) : null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(String(localStorage.getItem('cartItems'))) : [],
        shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(String(localStorage.getItem('shippingAddress'))) : {},
        paymentMethod: 'PayPal',
    }
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;