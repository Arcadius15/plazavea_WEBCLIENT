import axios from "axios";
import authHeader from "../auth/auth-header";

const URL = process.env.REACT_APP_API_URL+'/tienda';

const getTiendas = () => {
    return axios.get(URL);
};

const getTienda = (id) => {
    return axios.get(URL +`/${id}`);
};

const postTienda = (tienda)=>{
    tienda.empleado = {idEmpleado:"USR_00004"}
    let body = JSON.stringify(tienda)
    var headers ={headers:authHeader()}
    return axios.post(URL,body,headers)
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