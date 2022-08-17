import Home from "./components/Home"
import Locales from "./components/Locales"
import ChangePassword from "./components/Login/ChangePassword"
import Login from "./components/Login/Login"
import ListaProductoxTienda from "./components/ProductoxTienda/ListaProductoxTienda"
import RegProductoxTienda from "./components/ProductoxTienda/RegProductoxTienda"
import ListarTiendas from "./components/Tienda/ListarTiendas"
import RegistrarTienda from "./components/Tienda/RegistrarTienda"
import VerTienda from "./components/Tienda/VerTienda"
import Unauthorized from "./components/Unauthorized"
import ListarUsuarios from "./components/Usuario/ListarUsuarios"
import RegistrarEmpleado from "./components/Usuario/RegistrarEmpleado"
import RegistrarRepartidor from "./components/Usuario/RegitrarRepartidor"

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
    {path:'/repartidor/registrar',componente:RegistrarRepartidor,secure:admin},
    {path:'/changepassword',componente:ChangePassword},
    {path:'/usuario/listar',componente:ListarUsuarios,secure:admin},
    {path:'/producto/listar',componente:ListaProductoxTienda,secure:admin},
    {path:'/producto/registrar',componente:RegProductoxTienda,secure:admin},
]

export default rutas