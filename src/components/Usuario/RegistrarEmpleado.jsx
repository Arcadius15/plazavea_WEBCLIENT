import { Formik } from 'formik'
import React, { useState } from 'react'
import EmpleadoSchema from './EmpleadoValidacion'
import Form from 'react-bootstrap/Form';
import ToastMessage from '../../utils/ToastMessage';
import { Button } from '@mui/material';
import style from './Usuario.module.css'
import UsuarioService from '../../services/service/Usuario.service';
import ToastError from '../../utils/ToastError';
import { useEffect } from 'react';
import TiendaService from '../../services/service/Tienda.service';


const RegistrarEmpleado = () => {
  const [show, setShow] = useState(false)
  const [showe,setShowe] = useState(false)
  const [mensaje,setMensaje] = useState('')
  const [tipo, setTipo] = useState('empleado')
  const [tiendas,setTiendas] = useState([])

  useEffect(()=>{
    const getTiendas= async ()=>{
      await TiendaService.getTiendas()
        .then(res=>{
          setTiendas(res.data)
        })
    }
    getTiendas()
  },[])

  const cambiarTipo = (tipoUsuario) => {
    setTipo(tipoUsuario)
  }

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
        <h3>Registrar Empleado</h3>
        <Formik
          initialValues={{
            email: '', password: '',
            roles: [], empleado: {
              nombres: '', apellidos: '',
              dni: '', fechaNacimiento: new Date().toISOString().split('T')[0],
              numTelefonico: '',
              tienda:{
                idTienda:''
              }
            },
          }}
          enableReinitialize={true}
          validationSchema={EmpleadoSchema}
          onSubmit={(values, actions) => {
            actions.setSubmitting(true)
            values.roles = Array.of(tipo)
            const registrar = async () => {
              console.log(values)
              await UsuarioService.postEmpleado(values)
                .then((res)=>{
                  if (res.status===200) {
                    mostrarToast()
                  }
                },(err)=>{
                  let msg = err.response.data.mensaje
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
                <Form.Control name='empleado.nombres' type='text' placeholder='Ingrese Nombres'
                  value={values.empleado.nombres} onChange={handleChange} onBlur={handleBlur}
                  className={errors.empleado && touched.empleado ? "error" : null}>
                </Form.Control>
                {touched.empleado && errors.empleado ?
                  (<div className={style.error_message}>{errors.empleado.nombres}</div>) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control name='empleado.apellidos' type='text' placeholder='Ingrese Apellidos'
                  onChange={handleChange} onBlur={handleBlur} value={values.empleado.apellidos}
                  className={errors.empleado && touched.empleado ? "error" : null}>
                </Form.Control>
                {touched.empleado && errors.empleado ?
                  (<div className={style.error_message}>{errors.empleado.apellidos}</div>) : null}
              </Form.Group>
              {/*dni*/}
              <Form.Group>
                <Form.Label>DNI:</Form.Label>
                <Form.Control name='empleado.dni' type='text' placeholder='Ingrese DNI'
                  onChange={handleChange} onBlur={handleBlur} value={values.empleado.dni}
                  className={errors.empleado && touched.empleado ? "error" : null}>
                </Form.Control>
                {touched.empleado && errors.empleado ?
                  (<div className={style.error_message}>{errors.empleado.dni}</div>) : null}
              </Form.Group>
              {/*numTelefonico*/}
              <Form.Group>
                <Form.Label>Fecha de Naciemiento:</Form.Label>
                <Form.Control name='empleado.fechaNacimiento' type='date'
                  placeholder='Ingrese Numero Telefonico'
                  onChange={handleChange} onBlur={handleBlur}
                  value={values.empleado.fechaNacimiento}
                  className={errors.empleado && touched.empleado ? "error" : null}>
                </Form.Control>
                {touched.empleado && errors.empleado ?
                  (<div className={style.error_message}>{errors.empleado.fechaNacimiento}</div>) : null}
              </Form.Group>
              {/*numTelefonico*/}
              <Form.Group>
                <Form.Label>Numero Telefonico:</Form.Label>
                <Form.Control name='empleado.numTelefonico' type='text'
                  placeholder='Ingrese Numero Telefonico'
                  onChange={handleChange} onBlur={handleBlur}
                  value={values.empleado.numTelefonico}
                  className={errors.empleado && touched.empleado ? "error" : null}>
                </Form.Control>
                {touched.empleado && errors.empleado ?
                  (<div className={style.error_message}>{errors.empleado.numTelefonico}</div>) : null}
              </Form.Group>
              <Form.Group>
                <Form.Label>Rol:</Form.Label>
                <Form.Select onChange={(e)=>cambiarTipo(e.currentTarget.value)}>
                  <option value="empleado">Empleado</option>
                  <option value="admin">Administrador</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Tienda:</Form.Label>
                <Form.Select name='empleado.tienda.idTienda' onChange={handleChange}>
                  {tiendas.map(tienda=>
                    <option key={tienda.idTienda} value={tienda.idTienda}>
                      {tienda.nombre}
                    </option>)}
                </Form.Select>
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

export default RegistrarEmpleado