import React from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({ ocultar }) => {
    const ocultarMensaje = () => {
        ocultar()
    }
    return (
        <div className="bg-dark position-relative">
            <ToastContainer position="bottom-end" className="p-3">
                <Toast bg={"success"} onClose={ocultarMensaje} show={true} 
                    delay={2000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Plaza Vea</strong>
                        <small>1 sec ago</small>
                    </Toast.Header>
                    <Toast.Body>Woohoo, has registrado exitosamente!</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>

    )
}

export default ToastMessage