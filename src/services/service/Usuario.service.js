import axiosConfig from "../../axiosConfig";
const URL = '/jwt';
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const postEmpleado = (empleado) => {
    let body = JSON.stringify(empleado)
    return instance.post(URL+"/registro/empleado",body)
}

const getAllUsers = () => {
    return instance.get(URL+'/allusers')
}

const UsuarioService = {
    postEmpleado,
    getAllUsers
}

export default UsuarioService