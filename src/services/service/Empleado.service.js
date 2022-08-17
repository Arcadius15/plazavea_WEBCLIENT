import axiosConfig from "../../axiosConfig";
const URL = '/empleado';
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const getAdmins =() => {
    return instance.get(URL+'/admins')
}

const EmpleadoService = {
    getAdmins
}

export default EmpleadoService