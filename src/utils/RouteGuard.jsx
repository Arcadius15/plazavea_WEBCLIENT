import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import jwt_decode from "jwt-decode";

//proteccion de endpoints
const RouteGuard = ({permisos}) => {
    let auth = false;
    const user = localStorage.getItem("user")
    if (user) {
        //obtiene token del json
        let token = JSON.parse(user).token
        //obtiene roles del token
        let roles = jwt_decode(token).roles
        //verifica que roles tengan permiso a los endpoints
        for (const e of permisos) {
            let buscarRol = "ROLE_"+e.toUpperCase()
            auth = validarRoles(roles,buscarRol)
            //si el rol esta permitido, se admite acceso
            if (auth) break;
        }
        //si no encontro en usuarios normales, comprueba si es master
        if (auth===false) {
            auth=validarRoles(roles)
        }
    }
    //verifica la autorizacion y da el acceso
    return auth?<Outlet/>:<Navigate to="/unauthorized"/>
};

//si el usuario tiene el acceso se retornara true
const validarRoles=(roles,buscar="ROLE_MASTER")=>{
    let auth = false
    roles.forEach(e => {
        if (e.authority===buscar) {
            console.log(e.authority)
            auth = true
        }
    });
    return auth
}

export default RouteGuard;