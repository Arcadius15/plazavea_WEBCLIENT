import { Form } from 'formik';
import React, { useState,useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';
import ProductoxTiendaService from '../../services/service/ProductoTienda.service';
import { Formik } from 'formik';
import { Button } from '@mui/material';

const UpdProductoxTienda = () => {
    const {idTienda,idProducto} = useParams()
    let navigate = useNavigate()
    if (idTienda,idProducto) {
        return navigate("/home")
    }

    const [prodtienda,setProdtienda] = useState(undefined)

    useEffect(()=>{
        const getProdTienda = async () =>{
            await ProductoxTiendaService.getProductoTienda(idTienda,idProducto)
                .then(res=>{
                    setProdtienda(res)
                },(err)=>{
                    console.log(err)
                    alert("Ocurrio un error")
                    navigate("/home")
                })
        }
        getProdTienda()
    },[idTienda,idProducto])

    return (
        <>
            <div className='container-fluid shadow-lg' style={{ margin: '10px' }}>
                <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px' }}>Registro de Productos Por Tienda</h1>
                <Formik
                    initialValues={
                        {
                            idProducto: prodtienda.id.idProducto,
                            idTienda: prodtienda.id.idTienda,
                            stock: prodtienda.stock
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
                            reloadScreen()
                        }
                        addStock()
                    }
                    }
                >
                    {({ values, handleChange, isSubmitting, handleSubmit, isValid, }) => (
                        <Form className='mx-auto' onSubmit={handleSubmit} style={{ margin: "18px" }}>
                            {/*Tienda */}
                            <Form.Group>
                                <Form.Label>Tienda:</Form.Label>
                                <Form.Control name={'idTienda'} value={values.idTienda}></Form.Control>
                            </Form.Group>
                            {/*Subcategoria */}
                            <Form.Group>
                                <Form.Label>Seleccione Sub Categoria:</Form.Label>
                                <Form.Select onChange={handleSubcatChange}>
                                    <option value='' selected={reload}>Seleccione una Sub Categoria</option>
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

export default UpdProductoxTienda