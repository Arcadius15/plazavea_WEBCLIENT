import axiosConfig from "../../axiosConfig";

const URL = '/subcategoria';
axiosConfig.setAuthToken()
const instance = axiosConfig.instance


const getSubcategorias= () => {
    return instance.get(URL)
}

const SubcategoriaService = {
    getSubcategorias
}

export default SubcategoriaService