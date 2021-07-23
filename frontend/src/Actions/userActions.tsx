import axios from "axios";
import { USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_LIST_ALL_FAIL, USER_LIST_ALL_REQUEST, USER_LIST_ALL_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from "../Constants/userConstants"

export const signin = (email : String, password : String) => async(dispatch : any) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password }});
    try {
        const {data} = await axios.post('https://webstore-clone.herokuapp.com/api/users/signin', {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
}

export const register = (name: String, email : String, password : String) => async(dispatch : any) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password }});
    try {
        const {data} = await axios.post('https://webstore-clone.herokuapp.com/api/users/register', { name, email, password });
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const signout = () => async (dispatch : any) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    dispatch({
        type: USER_SIGNOUT
    });
};

export const detailsUser = (userId: String) => async(dispatch: any, getState: any) => {
    dispatch({type: USER_DETAILS_REQUEST, payload: userId});
    const {userSignin: {userInfo}} = getState();
    try {
        const { data } = await axios.get(`https://webstore-clone.herokuapp.com/api/users/${userId}`,{
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_DETAILS_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch({type: USER_DETAILS_FAIL, payload: message});
    }
};

export const updateUserProfile = (user: any) => async (dispatch: any, getState: any) => {
    dispatch({type: USER_UPDATE_PROFILE_REQUEST, payload: user});
    const { userSignin:{userInfo}} = getState();
    try {
        const { data } = await axios.put(`https://webstore-clone.herokuapp.com/api/users/profile`, user, {
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_UPDATE_PROFILE_SUCCESS, payload: data});
        dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch({type: USER_UPDATE_PROFILE_FAIL, payload: message});
    }
}

export const listAllUsers = (userId: string) => async (dispatch: any, getState: any) => {
    dispatch({type: USER_LIST_ALL_REQUEST});
    const {userSignin: {userInfo}} = getState();
    try {
        const {data} = await axios.get(`http://localhost:5000/api/users/list/${userId}` ,{
            headers: { Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: USER_LIST_ALL_SUCCESS, payload: data});
    } catch (error) {
        const message = error.response && error.response.data.message ?
        error.response.data.message :
        error.message;
        dispatch({type: USER_LIST_ALL_FAIL, payload: message});
    }
}