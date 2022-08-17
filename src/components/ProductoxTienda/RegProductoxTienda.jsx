import React, { useEffect, useState } from 'react'
import ProductoService from '../../services/service/Producto.service'
import SubcategoriaService from '../../services/service/Subcategoria.service'
import TiendaService from '../../services/service/Tienda.service'
import { Formik } from 'formik';
import Form from 'react-bootstrap/Form';
import { Button } from '@mui/material';
import productoxtiendaSchema from './ProductoxTiendaValidacion';
import ProductoxTiendaService from '../../services/service/ProductoTienda.service';
import { useRef } from 'react';

const RegProductoxTienda = () => {
  const [tiendas, setTiendas] = useState([])
  const [subcategorias, setSubcategorias] = useState([])
  const [selectedsc, setSelectedsc] = useState(undefined)
  const [productos, setProductos] = useState([])
  const subcatSelect = useRef()

  useEffect(() => {
    const getTiendas = async () => {
      await TiendaService.getTiendas()
        .then(res => {
          setTiendas(res.data)
        })
    }
    getTiendas()
  }, [])

  useEffect(() => {
    const getSubcategorias = async () => {
      await SubcategoriaService.getSubcategorias()
        .then(res => {
          setSubcategorias(res.data)
        })
    }
    getSubcategorias()
  }, [])

  useEffect(() => {
    const getProductos = async () => {
      if (selectedsc) {
        await ProductoService.getProductosBySubcat(selectedsc, true)
          .then(res => {
            setProductos(res.data.content)
          })
      }
    }
    getProductos()
  }, [selectedsc])

  const handleSubcatChange = (e) => {
    setSelectedsc(e.target.value)
  }

  return (
    <>
      <div className='container-fluid shadow-lg' style={{ margin: '10px' }}>
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>Registro de Productos Por Tienda</h1>
        <Formik
          initialValues={
            {
              idProducto: '',
              idTienda: '',
              stock: 0
            }
          }
          validateOnMount
          validationSchema={productoxtiendaSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setSubmitting(true)
            const addStock = async () => {
              await ProductoxTiendaService.postProductosxTienda(values)
                .then(() => {
                  alert("Producto guardado.")
                }, () => {
                  alert("Error al registrar")
                })
              setSubmitting(false)
              resetForm()
              subcatSelect.current.value=''
            }
            addStock()
          }
          }
        >
          {({ values, handleChange, isSubmitting, handleSubmit, isValid,}) => (
            <Form className='mx-auto' onSubmit={handleSubmit} style={{ margin: "18px" }}>
              {/*Tienda */}
              <Form.Group>
                <Form.Label>Seleccione Tienda:</Form.Label>
                <Form.Select name='idTienda' value={values.idTienda} onChange={handleChange} >
                  <option value=''>Seleccione una Tienda</option>
                  {tiendas.map(tienda =>
                    <option key={tienda.idTienda} value={tienda.idTienda}>
                      {tienda.nombre}</option>)}
                </Form.Select>
              </Form.Group>
              {/*Subcategoria */}
              <Form.Group>
                <Form.Label>Seleccione Sub Categoria:</Form.Label>
                <Form.Select onChange={handleSubcatChange} defaultValue='' ref={subcatSelect}>
                  <option value=''>Seleccione una Sub Categoria</option>
                  {subcategorias.map(sc =>
                    <option key={sc.idSubcategoria} value={sc.idSubcategoria}>
                      {sc.nombre}</option>)}
                </Form.Select>
              </Form.Group>
              {/*Producto */}
              <Form.Group>
                <Form.Label>Seleccione Producto:</Form.Label>
                <Form.Select name='idProducto' value={values.idProducto} onChange={handleChange} disabled={selectedsc ? false : true}>
                  <option value=''>Seleccione un Producto</option>
                  {selectedsc ? productos.map(producto =>
                    <option key={producto.idProducto} value={producto.idProducto}>
                      {producto.nombre}</option>) : null}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Range</Form.Label><br />
                <Form.Text>Stock agregado: {values.stock}</Form.Text><br />
                <Form.Range name='stock' onChange={handleChange} value={values.stock} max={50} style={{ width: "30%" }} disabled={selectedsc ? false : true} />
              </Form.Group>
              <Button style={{ margin: "15px" }}
                color="success" type='submit' disabled={isSubmitting || !isValid}>
                Registrar
              </Button>
            </Form>

          )}

        </Formik>
      </div>

    </>
  )
}

export default RegProductoxTienda