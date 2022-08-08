import axiosConfig from "../../axiosConfig";
const URL = '/jwt';
axiosConfig.setAuthToken()
const instance = axiosConfig.instance

const postEmpleado = (empleado) => {
    let body = JSON.stringify(empleado)
    return instance.post(URL+"/registro/empleado",body)
}

const UsuarioService = {
    postEmpleado
}

export default UsuarioService