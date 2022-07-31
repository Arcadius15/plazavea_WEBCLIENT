import axiosConfig from "../../axiosConfig";
import authHeader from "../auth/auth-header";

const URL = '/producto';
const instance = axiosConfig.instance

const getProductos = async (pagina=1) => {
    return await instance.get(URL +`?page=${pagina}`);
};

const postProducto = async(producto)=>{
    let body = JSON.stringify(producto)
    return await instance.post(URL,body,authHeader())
}

const patchProducto = async(id,props)=>{
    let body = JSON.stringify(props)
    return await instance.patch(URL,body,authHeader())
}

const ProductoService = {
    getProductos,
    postProducto,
    patchProducto
}

export default ProductoService