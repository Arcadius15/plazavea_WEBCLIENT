import axios from "axios";
import authHeader from "../auth/auth-header";

const URL = process.env.REACT_APP_API_URL+'/producto';

const getProductos = async (pagina=1) => {
    return await axios.get(URL +`?page=${pagina}`);
};

const postProducto = async(producto)=>{
    let body = JSON.stringify(producto)
    return await axios.post(URL,body,authHeader())
}

const patchProducto = async(id,props)=>{
    let body = JSON.stringify(props)
    return await axios.patch(URL,body,authHeader())
}

const ProductoService = {
    getProductos,
    postProducto,
    patchProducto
}

export default ProductoService