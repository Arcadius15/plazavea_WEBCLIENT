import { Formik } from 'formik'
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import ToastMessage from '../../utils/ToastMessage';
import { Button } from '@mui/material';
import style from './Usuario.module.css'
import UsuarioService from '../../services/service/Usuario.service';
import ToastError from '../../utils/ToastError';
import RepartidorSchema from './RepartidorValidacion';


const RegistrarRepartidor = () => {
    const [show, setShow] = useState(false)
    const [showe, setShowe] = useState(false)
    const [mensaje, setMensaje] = useState('')

    const mostrarToast = () => {
        setShow(true)
    }
    const ocultarToast = () => {
        setShow(false)
    }
    const mostrarError = (erroMessage) => {
        setMensaje(erroMessage)
        setShowe(true)
    }
    const ocultarError = () => {
        setMensaje('')
        setShowe(false)
    }
    return (
        <>
            <div className='container-fluid'>
                <h3>Registrar Repartidor</h3>
                <Formik
                    initialValues={{
                        email: '', password: '',
                        roles: [], repartidor: {
                            nombre: '', apellidos: '',
                            dni: '', fechaNacimiento: new Date().toISOString().split('T')[0],
                            numTelefonico: '',
                            turno: 0,
                            placa: '', direccion: '',status:'FUERA_DE_SERVICIO'
                        },
                    }}
                    enableReinitialize={true}
                    validationSchema={RepartidorSchema}
                    onSubmit={(values, actions) => {
                        actions.setSubmitting(true)
                        values.roles = Array.of('repartidor')
                        const registrar = async () => {
                          console.log(values)
                          await UsuarioService.postEmpleado(values)
                            .then((res)=>{
                              if (res.status===200) {
                                mostrarToast()
                              }
                            },(err)=>{
                              let msg = err.response.data.mensaje
                              console.log(err)
                              msg?mostrarError(msg):mostrarError('Ha ocurrido un Problema.')
                            })
                        }
                        registrar()
                        actions.setSubmitting(false)
                        actions.resetForm()
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
                        <Form className='mx-auto' onSubmit={handleSubmit}>
                            {/*Correo*/}
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control name='email' type='text' placeholder='Ingrese Correo'
                                    onChange={handleChange} onBlur={handleBlur} value={values.email}
                                    className={touched.email && errors.email ? "error" : null}>
                                </Form.Control>
                                {touched.email && errors.email ?
                                    (<div className={style.error_message}>{errors.email}</div>) : null}
                            </Form.Group>
                            {/*password*/}
                            <Form.Group>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control name='password' type='password' placeholder='Ingrese Password'
                                    onChange={handleChange} onBlur={handleBlur} value={values.password}
                                    className={touched.password && errors.password ? "error" : null}>
                                </Form.Control>
                                {touched.password && errors.password ?
                                    (<div className={style.error_message}>{errors.password}</div>) : null}
                            </Form.Group>
                            {/*nombres*/}
                            <Form.Group>
                                <Form.Label>Nombres:</Form.Label>
                                <Form.Control name='repartidor.nombre' type='text' placeholder='Ingrese Nombres'
                                    value={values.repartidor.nombre} onChange={handleChange} onBlur={handleBlur}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.nombre}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Apellidos:</Form.Label>
                                <Form.Control name='repartidor.apellidos' type='text' placeholder='Ingrese Apellidos'
                                    onChange={handleChange} onBlur={handleBlur} value={values.repartidor.apellidos}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.apellidos}</div>) : null}
                            </Form.Group>
                            {/*Direccion */}
                            <Form.Group>
                                <Form.Label>Direccion:</Form.Label>
                                <Form.Control name='repartidor.direccion' type='text' placeholder='Ingrese Direccion'
                                    onChange={handleChange} onBlur={handleBlur} value={values.repartidor.direccion}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.direccion}</div>) : null}
                            </Form.Group>

                            {/*dni*/}
                            <Form.Group>
                                <Form.Label>DNI:</Form.Label>
                                <Form.Control name='repartidor.dni' type='text' placeholder='Ingrese DNI'
                                    onChange={handleChange} onBlur={handleBlur} value={values.repartidor.dni}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.dni}</div>) : null}
                            </Form.Group>
                            {/*numTelefonico*/}
                            <Form.Group>
                                <Form.Label>Fecha de Naciemiento:</Form.Label>
                                <Form.Control name='repartidor.fechaNacimiento' type='date'
                                    placeholder='Ingrese Numero Telefonico'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.repartidor.fechaNacimiento}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.fechaNacimiento}</div>) : null}
                            </Form.Group>
                            {/*numTelefonico*/}
                            <Form.Group>
                                <Form.Label>Numero Telefonico:</Form.Label>
                                <Form.Control name='repartidor.numTelefonico' type='text'
                                    placeholder='Ingrese Numero Telefonico'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.repartidor.numTelefonico}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.numTelefonico}</div>) : null}
                            </Form.Group>
                            {/*placa*/}
                            <Form.Group>
                                <Form.Label>Numero de Placa:</Form.Label>
                                <Form.Control name='repartidor.placa' type='text'
                                    placeholder='Ingrese Numero de Placa'
                                    onChange={handleChange} onBlur={handleBlur}
                                    value={values.repartidor.placa}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                </Form.Control>
                                {touched.repartidor && errors.repartidor ?
                                    (<div className={style.error_message}>{errors.repartidor.placa}</div>) : null}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Turno:</Form.Label>
                                <Form.Control as={'select'} name='repartidor.turno'
                                    value={values.repartidor.turno} onChange={handleChange}
                                    className={errors.repartidor && touched.repartidor ? "error" : null}>
                                    <option value={0}>Mañana</option>
                                    <option value={1}>Tarde</option>
                                    <option value={2}>Noche</option>
                                </Form.Control>
                            </Form.Group>
                            <Button style={{ margin: "15px" }}
                                color="success" type='submit' disabled={isSubmitting}>
                                Guardar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            {show ? <ToastMessage ocultar={ocultarToast} /> : null}
            {showe ? <ToastError ocultar={ocultarError} mensaje={mensaje} /> : null}
        </>
    )
}

export default RegistrarRepartidor