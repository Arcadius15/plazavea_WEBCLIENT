import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Private from "./components/Private";
import "bootstrap/dist/css/bootstrap.min.css";
import Locales from "./components/Locales";
import ListarTiendas from "./components/Tienda/ListarTiendas";
import VerTienda from "./components/Tienda/VerTienda";
import NavbarUser from "./utils/NavbarUser";
import RegistrarTienda from "./components/Tienda/RegistrarTienda";
import RouteGuard from "./utils/RouteGuard.jsx"

function App() {

  return (
    <>
      <div>
        <NavbarUser />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/private" element={<Private />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mapa" element={<Locales />} />
            <Route path="/tiendas" element={<ListarTiendas />} />
            <Route path="/tienda/:id" element={<VerTienda />} />
            {/* <Route path="/tiendas/registrar" element={<RegistrarTienda/>}/> */}
            <Route exact path='/tiendas/registrar' element={<RouteGuard/>}>
              <Route exact path='/tiendas/registrar' element={<RegistrarTienda />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
