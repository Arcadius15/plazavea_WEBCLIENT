import Home from "./components/Home"
import Locales from "./components/Locales"
import Login from "./components/Login/Login"
import ListarTiendas from "./components/Tienda/ListarTiendas"
import RegistrarTienda from "./components/Tienda/RegistrarTienda"
import VerTienda from "./components/Tienda/VerTienda"
import Unauthorized from "./components/Unauthorized"
import RegistrarEmpleado from "./components/Usuario/RegistrarEmpleado"

//credenciales admitidas en endpoints
const admin=['admin']
const emp=['empleado','admin']

//endpoints de la pagina
const rutas = [
    {path:'/',componente:Home},
    {path:'/login',componente:Login},
    {path:'/home',componente:Home},
    {path:'/mapa',componente:Locales},
    {path:'/tiendas',componente:ListarTiendas},
    {path:'/tienda/:id',componente:VerTienda},
    {path:'/unauthorized',componente:Unauthorized},
    {path:'/tiendas/registrar',componente:RegistrarTienda,secure:emp},
    {path:'/empleado/registrar',componente:RegistrarEmpleado,secure:admin}, 
]

export default rutas