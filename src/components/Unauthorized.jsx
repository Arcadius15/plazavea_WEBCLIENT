import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/auth/auth.service'
import Image from 'react-bootstrap/Image'



const Unauthorized = () => {
    const user = localStorage.getItem("user")
    let navigate = useNavigate()
    const cerrarSesion = () => {
        authService.logout()
        
        navigate('/login')
        window.location.reload()
    }
    const iniciarSesion = () => {
        navigate('/login')
    }
    return (
        <>
            <div className='container-fluid' style={{ display: "grid", justifyContent: "center"}}>
                <h3 style={{textAlign:'center'}}>Usuario no Autorizado</h3>
                <Image fluid={true} src='https://blog.mozilla.org/wp-content/blogs.dir/278/files/2018/05/No_More_404s.gif'>
                </Image>
                <div style={{ display: "flex", justifyContent: "center",margin:"0.9em" }}>
                    {user ? (
                        <Button variant="contained" color="secondary"
                            onClick={cerrarSesion}>
                            Cerrar Sesion
                        </Button>
                    ) : (
                        <Button variant="contained" color="success"
                            onClick={iniciarSesion}>
                            Iniciar Sesion
                        </Button>)}
                </div>
            </div>
        </>
    )
}

export default Unauthorized