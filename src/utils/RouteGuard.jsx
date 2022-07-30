import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RouteGuard = () => {
    let auth = false;
    localStorage.getItem("user") ? auth = true : auth = false

    return auth?<Outlet/>:<Navigate to="/login"/>
};

export default RouteGuard;