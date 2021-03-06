import axios from 'axios';
import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/productConstants"

export const listProducts = () => async (dispatch : any) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    });
    try {
        const { data } = await axios.get('https://webstore-clone.herokuapp.com/api/products');
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });
    } catch(error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        });
    }
};

export const productDetails = (productId : string | null) => async (dispatch: any) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
        const {data} : any = await axios.get(`https://webstore-clone.herokuapp.com/api/products/${productId}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });
    } catch(error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
            });
    }
}