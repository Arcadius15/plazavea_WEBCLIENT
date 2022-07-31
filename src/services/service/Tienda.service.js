import axios from "axios";
import authHeader from "../auth/auth-header";
import axiosConfig from "../../axiosConfig";

const URL = '/tienda';
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const getTiendas = () => {
    return instance.get(URL);
};

const getTienda = (id) => {
    return instance.get(URL +`/${id}`);
};

const postTienda = (tienda)=>{
    tienda.empleado = {idEmpleado:"USR_00004"}
    let body = JSON.stringify(tienda)
    return instance.post(URL,body)
}

const patchTienda =(id,props)=>{
    let body = JSON.stringify(props)
    return axios.patch(URL+`/${id}`,body,authHeader())
}

const TiendaService={
    getTiendas,
    getTienda,
    postTienda,
    patchTienda
}

export default TiendaService