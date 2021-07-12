import React from "react";
import { useSelector } from "react-redux"
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({component, ...rest}: any) => {
    const userSignin = useSelector((state: any) => state.userSignin);
    const { userInfo } = userSignin;
    const routeComponent = (props: any) => (
        userInfo && userInfo.isAdmin
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/signin'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default AdminRoute;