import axiosConfig from "../../axiosConfig";
import authHeader from "../auth/auth-header";

const URL = '/producto';
const instance = axiosConfig.instance

const getProductos = (pagina=1) => {
    return instance.get(URL +`?page=${pagina}`);
};

const postProducto = async(producto)=>{
    let body = JSON.stringify(producto)
    return await instance.post(URL,body,authHeader())
}

const getProductosBySubcat=(id,unpaged=false)=>{
    return instance.get(URL+`/subcategoria/${id}?unpaged=${unpaged}`)
}

const patchProducto = async(id,props)=>{
    let body = JSON.stringify(props)
    return await instance.patch(URL,body,authHeader())
}

const ProductoService = {
    getProductos,
    postProducto,
    patchProducto,
    getProductosBySubcat
}

export default ProductoService