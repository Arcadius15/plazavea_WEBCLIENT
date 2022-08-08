import axiosConfig from "../../axiosConfig";

const URL = '/productotienda'
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const getProductosxTienda=(idTienda,pagina=0)=>{
    return instance.get(URL+`/tienda/${idTienda}?page=${pagina}`)
}

const ProductoxTiendaService = {
    getProductosxTienda
}

export default ProductoxTiendaService