import axiosConfig from "../../axiosConfig";

const URL = '/productotienda'
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const getProductosxTienda=(idTienda,unpaged=false)=>{
    return instance.get(URL+`/tienda/${idTienda}?unpaged=${unpaged}`)
}

const getProductoTienda=(idTienda,idProducto)=>{
    return instance.get(URL+`/${idTienda}/${idProducto}`)
}

const postProductosxTienda=(values)=>{
    return instance.post(URL,values)
}

const ProductoxTiendaService = {
    getProductosxTienda,
    postProductosxTienda,
    getProductoTienda
}

export default ProductoxTiendaService