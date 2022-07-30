import React, { useEffect, useState } from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({ showed }) => {
    const [show, setShow] = useState(false);
    useEffect(() => { setShow(showed) }, [showed])
    return (
        <ToastContainer position="bottom-end" className="p-3">
            <Toast onClose={() => setShow(false)} show={show}>
                <Toast.Header>
                    <strong className="me-auto">Plaza Vea</strong>
                    <small>1 sec ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, has registrado exitosamente!</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}

export default ToastMessage