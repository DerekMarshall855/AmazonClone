import axios from "axios";
import { CART_EMPTY } from "../Constants/cartConstants";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQEUST, ORDER_DETAILS_SUCCESS, ORDER_MINE_LIST_FAIL, ORDER_MINE_LIST_REQUEST, ORDER_MINE_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../Constants/orderConstants"

export const createOrder = (order: any) => async(dispatch: any, getState: any) => {
    dispatch({type: ORDER_CREATE_REQUEST, payload: order});

    try {
        const {userSignin: {userInfo}} = getState();
        const {data} = await axios.post('/api/orders', order, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({type: CART_EMPTY});
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL,
        payload: error.response && error.response.data.message ?
        error.response.data.message :
        error.message});
    }
};

export const detailsOrder = (orderId: any) => async(dispatch: any, getState: any) => {
    dispatch({type: ORDER_DETAILS_REQEUST, payload: orderId});
    const {userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch( { type: ORDER_DETAILS_FAIL, payload: message });
    }
};

export const payOrder = (order: any, paymentResult: any) => async(dispatch: any, getState: any) => {
    dispatch({type: ORDER_PAY_REQUEST, payload: {order, paymentResult}});
    const {userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: ORDER_PAY_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch( { type: ORDER_PAY_FAIL, payload: message });
    }
};

export const listOrderMine = () => async (dispatch: any, getState: any) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST });
    const {userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get('/api/orders/mine', {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch( { type: ORDER_MINE_LIST_FAIL, payload: message });
    }
}