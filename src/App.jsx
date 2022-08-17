import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarUser from "./utils/NavbarUser";
import RouteGuard from "./utils/RouteGuard.jsx"
import rutas from './rutas'

// import Login from "./components/Login/Login";
// import Signup from "./components/Signup";
// import Home from "./components/Home";
// import Private from "./components/Private";
// import Locales from "./components/Locales";
// import ListarTiendas from "./components/Tienda/ListarTiendas";
// import VerTienda from "./components/Tienda/VerTienda";
// import RegistrarTienda from "./components/Tienda/RegistrarTienda";
// import Unauthorized from "./components/Unauthorized"

function App() {

  // let admins=['admin']
  // let emp=['empleado','admin']

  return (
    <>
      <div>
        <NavbarUser />
        <div className="container">
          <Routes>
            {/* <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/private" element={<Private />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mapa" element={<Locales />} />
            <Route path="/tiendas" element={<ListarTiendas />} />
            <Route path="/tienda/:id" element={<VerTienda />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route exact path='/tiendas/registrar' element={<RouteGuard permisos={emp}/>}>
              <Route exact path='/tiendas/registrar' element={<RegistrarTienda />} />
            </Route>
            <Route exact path='/empleado/registrar' element={<RouteGuard permisos={admins}/>}>
              <Route exact path='/empleado/registrar' element={<RegistrarTienda />} />
            </Route> */}
            {rutas.map(ruta=>
              ruta.secure?(
                <Route key={ruta.path} path={ruta.path} element={<RouteGuard permisos={ruta.secure}/>}>
                  <Route path={ruta.path} element={<ruta.componente/>}></Route>
                </Route>
              ):(
                <Route key={ruta.path} path={ruta.path} element={<ruta.componente/>}/>
              )
            )}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
