import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import authService from '../services/auth/auth.service';
import jwt from "jwt-decode"

const NavbarUser = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [info, setInfo] = useState(undefined)
    const [roles, setRoles] = useState([])

    const logOut = () => {
        authService.logout();
    };

    const admins = ["ROLE_MASTER", "ROLE_ADMIN"]
    const emp = ["ROLE_MASTER", "ROLE_ADMIN", "ROLE_EMPLEADO"]

    const verifyRol = (permisos) => {
        for (let rol of roles) {
            if (permisos.includes(rol.authority))
                return true
        }
        return false
    }

    const verifyUser = () => {
        const user = authService.getCurrentUser();
        if (user) {
            const date = new Date(jwt(user.token).exp * 1000)
            if (date < Date.now()) {
                alert("Tiempo de Navegacion vencido")
                logOut()
                setCurrentUser(undefined)
            }
        }

    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            try {
                setInfo(jwt(user.token).info)
                setRoles(jwt(user.token).roles)
            } catch (error) {
                setInfo(undefined)
            }
        }

    }, []);

    return (
        <>
            {verifyUser()}
            <Navbar bg="dark" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href='/'>Plaza Vea HOME</Navbar.Brand>
                    <Navbar.Toggle aria-controls='navbarScroll' />
                    <Navbar.Collapse id='navbarScroll'>
                        <Nav className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll>
                            <Nav.Link href={"/home"}>Pagina Principal</Nav.Link>
                            <Nav.Link href={"/mapa"}>Mapa</Nav.Link>
                            {currentUser && verifyRol(emp) ?
                                <NavDropdown title="Tiendas" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href={"/tiendas"}>Listar Tiendas</NavDropdown.Item>
                                    <NavDropdown.Item href={"/tiendas/registrar"}>
                                        Registrar Tienda
                                    </NavDropdown.Item>
                                </NavDropdown>
                                :
                                <Nav.Link href={"/tiendas"}>
                                    Nuestras Tiendas
                                </Nav.Link>}
                            {currentUser && verifyRol(admins) ? (
                                <NavDropdown title="Empleados" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href={"/usuario/listar"}>Listar Empleados</NavDropdown.Item>
                                    <NavDropdown.Item href={"/empleado/registrar"}>
                                        Registrar Empleado
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={"/repartidor/registrar"}>
                                        Registrar Repartidor
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : null}
                            {currentUser && verifyRol(admins) ? (
                                <NavDropdown title="Productos" id="navbarScrollingDropdown">
                                    <NavDropdown.Item href={"/producto/listar"}>Listar Productos</NavDropdown.Item>
                                    <NavDropdown.Item href={"/producto/registrar"}>
                                        Registrar Producto
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : null}

                        </Nav>

                        {/*Info y Logout*/}
                        {currentUser ?
                            <Nav className='ms-auto'>
                                {info ?
                                    <Nav.Link href='#'>
                                        Usuario: {info.nombres.split(' ')[0]}
                                    </Nav.Link> :
                                    <Nav.Link>Usuario Master</Nav.Link>
                                }
                                <Nav.Link href={"/login"} onClick={logOut}>
                                    Logout
                                </Nav.Link>
                            </Nav>
                            :
                            <Nav className='ms-auto'>
                                <Nav.Link href={"/login"}>Login</Nav.Link>
                            </Nav>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarUser