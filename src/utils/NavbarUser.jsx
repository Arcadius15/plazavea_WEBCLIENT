import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav } from "react-bootstrap";
import NavDropdown from 'react-bootstrap/NavDropdown';
import authService from '../services/auth/auth.service';
import jwt from "jwt-decode"

const NavbarUser = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    const logOut = () => {
        authService.logout();
    };

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
                            {currentUser ?
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

                        </Nav>
                        {currentUser ?
                            <Nav className='ms-auto'>
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