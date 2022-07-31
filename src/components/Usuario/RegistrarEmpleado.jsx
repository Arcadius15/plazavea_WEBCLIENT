import { Formik } from 'formik'
import React, { useState } from 'react'
import EmpleadoSchema from './EmpleadoValidacion'
import Form from 'react-bootstrap/Form';
import ToastMessage from '../../utils/ToastMessage';
import { Button } from '@mui/material';


const RegistrarEmpleado = () => {
  const [show, setShow] = useState(false)

  const mostrarToast=()=>{
    setShow(true)
  }
  const ocultarToast=()=>{
    setShow(false)
  }
  return (
    <>
      <div className='container-fluid'>
        <h3>Registrar Empleado</h3>
        <Formik
          initialValues={{
            email:'',password:'',
            rol:'',empleado:{
              nombres:'',apellidos:'',
              dni:'',fechaNacimiento:new Date(),
              numTelefonico:''
            }
          }}
          validationSchema={EmpleadoSchema}
          onSubmit={(values,{setSubmitting,resetForm})=>{
            setSubmitting(true)
            alert(JSON.stringify(values))
            mostrarToast()
            setSubmitting(false)
            resetForm()
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit })=>(
            <Form className='mx-auto' onSubmit={handleSubmit}>
              {/*Correo*/} 
              <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control name='email' type='text' placeholder='Ingrese Correo'
                   onChange={handleChange} onBlur={handleBlur} value={values.email}
                   className={touched.email && errors.email ? "error" : null}>
                </Form.Control>
              </Form.Group>
              {/*password*/} 
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control name='password' type='text' placeholder='Ingrese Password'
                   onChange={handleChange} onBlur={handleBlur} value={values.password}
                   className={touched.password && errors.password ? "error" : null}>
                </Form.Control>
              </Form.Group>
              {/*nombres*/} 
              <Form.Group>
                <Form.Label>Nombres:</Form.Label>
                <Form.Control name='empledo.nombres' type='text' placeholder='Ingrese Nombres'
                   onChange={handleChange} onBlur={handleBlur} value={values.empledo.nombres}
                   className={touched.empledo.nombres && errors.empledo.nombres ? "error" : null}>
                </Form.Control>
              </Form.Group>
              {/*apellidos*/} 
              <Form.Group>
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control name='empleado.apellidos' type='text' placeholder='Ingrese Apellidos'
                   onChange={handleChange} onBlur={handleBlur} value={values.empleado.apellidos}
                   className={touched.empleado.apellidos && errors.empleado.apellidos ? "error" : null}>
                </Form.Control>
              </Form.Group>
              {/*dni*/} 
              <Form.Group>
                <Form.Label>DNI:</Form.Label>
                <Form.Control name='empleado.dni' type='text' placeholder='Ingrese DNI'
                   onChange={handleChange} onBlur={handleBlur} value={values.empleado.dni}
                   className={touched.empleado.dni && errors.empleado.dni ? "error" : null}>
                </Form.Control>
              </Form.Group>
              {/*numTelefonico*/} 
              <Form.Group>
                <Form.Label>Correo:</Form.Label>
                <Form.Control name='empleado.numTelefonico' type='text' 
                  placeholder='Ingrese Numero Telefonico'
                  onChange={handleChange} onBlur={handleBlur} 
                  value={values.empleado.numTelefonico}
                  className={touched.empleado.numTelefonico && 
                    errors.empleado.numTelefonico 
                    ? "error" : null}>
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
      {show?<ToastMessage ocultar={ocultarToast}/>:null}
    </>
  )
}

export default RegistrarEmpleado