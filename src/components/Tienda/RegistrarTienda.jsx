import React, { useState } from 'react'
import { Formik } from 'formik';
import TiendaValidacion from './TiendaValidacion'
import MapForm from '../../utils/MapForm';
import TiendaService from '../../services/service/Tienda.service'
import ToastMessage from '../../utils/ToastMessage';
import Form from 'react-bootstrap/Form';
import style from "./RegistrarTienda.module.css"
import { Button } from 'react-bootstrap';

const RegistrarTienda = () => {
  const [show, setShow] = useState(false)

  const mostrarToast=()=>{
    setShow(true)
  }
  const ocultarToast=()=>{
    setShow(false)
  }
  return (
    <>
      <div className='container-fluid shadow-lg' style={{ margin: '10px' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>Registro Tienda</h1>
        <Formik
          initialValues={
            {
              nombre: '', direccion: '',
              lat: 0, lng: 0, numeroTelefonico: '',
              horarioA: '00:00', horarioC: '00:00'
            }
          }
          validationSchema={TiendaValidacion}

          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log(values)
            const registrar = async () => {
              await TiendaService.postTienda(values).then(res => {
                if (res.status === 201) {
                  mostrarToast()
                } else {
                  alert("Error" + res.status + ": Error al registrar")
                }
              }, error => {
                console.log(error)
                
              })
              setSubmitting(false);
              resetForm();
            }
            registrar()
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting, handleSubmit }) => (
            <Form className='mx-auto' onSubmit={handleSubmit}>
              <Form.Group controlId='formNombre'>
                <Form.Label>Nombre: </Form.Label>
                <Form.Control type='text' name='nombre' placeholder='Ingrese Nombre'
                  onChange={handleChange} onBlur={handleBlur} value={values.nombre}
                  className={touched.nombre && errors.nombre ? "error" : null}>
                </Form.Control>
                {touched.nombre && errors.nombre ?
                  (<div className={style.error_message}>{errors.nombre}</div>) : null}
              </Form.Group>
              <Form.Group controlId='formDireccion'>
                <Form.Label>Direccion:</Form.Label>
                <Form.Control type='text' name='direccion' placeholder='Ingrese Direccion'
                  onChange={handleChange} onBlur={handleBlur} value={values.direccion}
                  className={touched.direccion && errors.direccion ? "error" : null}>
                </Form.Control>
                {touched.direccion && errors.direccion ?
                  (<div className={style.error_message}>{errors.direccion}</div>) : null}
              </Form.Group>
              <Form.Group controlId='formNumeroTelefono'>
                <Form.Label>Numero de Contacto:</Form.Label>
                <Form.Control type='text' name='numeroTelefonico' placeholder='Ingrese Numero de Contacto'
                  onChange={handleChange} onBlur={handleBlur} value={values.numeroTelefonico}
                  className={touched.numeroTelefonico && errors.numeroTelefonico ? 'error' : null}>
                </Form.Control>
                {touched.numeroTelefonico && errors.numeroTelefonico ?
                  (<div className={style.error_message}>{errors.numeroTelefonico}</div>) : null}
              </Form.Group>
              <Form.Group controlId='formHorarioA'>
                <Form.Label>Horario Abre:</Form.Label>
                <Form.Control type='time' name='horarioA' onChange={handleChange} onBlur={handleBlur}
                  value={values.horarioA}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='formHorarioC'>
                <Form.Label>Horario Cierra:</Form.Label>
                <Form.Control type='time' name='horarioC' onChange={handleChange} onBlur={handleBlur}
                  value={values.horarioC}>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='formMapa'>
                <Form.Label>Mapa:</Form.Label>
                <MapForm />
                {values.lat===0||values.lng===0 ?
                  (<div className={style.error_message}>{"Ingrese Coordenada"}</div>) : null}
              </Form.Group>

              <Button style={{ margin: "15px" }}
                color="success" type='submit' disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        {/* <Button color="success" onClick={mostrarToast}>Muestra toast</Button> */}
        
        {/* <ToastMessage showed={show} /> */}


      </div>
      {show?<ToastMessage ocultar={ocultarToast}/>:null}
    </>
  )
}

export default RegistrarTienda