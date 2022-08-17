import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from '../../utils/CustomToolBar';
import TiendaService from '../../services/service/Tienda.service';
import ProductoxTiendaService from '../../services/service/ProductoTienda.service';
import Image from 'react-bootstrap/Image'

const ImageGrid = ({ params }) => {
    const imageUrl = params.row.producto.imagenUrl
    return <Image src={imageUrl} style={{ margin: "3px" }} alt={"..."} roundedCircle fluid />
}

const columns = [
    {
        field: 'idProducto', headerName: 'ID Producto', width: 150,
        valueGetter: (params) => {
            return params.row.producto.idProducto
        }
    },
    {
        field: 'nombreProducto', headerName: 'Nombre Producto', width: 250,
        valueGetter: (params) => {
            return params.row.producto.nombre
        }
    },
    { field: 'stock', headerName: 'Stock Disponible', width: 150 ,align: 'center'},
    {
        field: 'imagen', headerName: 'Imagen', width: 80,
        sortable: false,
        renderCell: (params) => {
            return <ImageGrid params={params} />
        }
    }


]

const ListaProductoxTienda = () => {
    const [tiendas, setTiendas] = useState([])
    const [tienda, setTienda] = useState('')
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const obtenerTiendas = async () => {
            await TiendaService.getTiendas().then(res => {
                setTiendas(res.data)
            })
        }
        obtenerTiendas()
    }, [])

    useEffect(() => {
        const getProductoxTienda = async () => {
            await ProductoxTiendaService.getProductosxTienda(tienda, true)
                .then(res => {
                    console.log(res)
                    setProductos(res.data.content)
                })
        }
        if (tienda) {
            getProductoxTienda()
        }

    }, [tienda])

    const handleChangeTienda = (event) => {
        setTienda(event.target.value)
    }

    return tiendas ? (
        <>
            <Container style={{ margin: "10px" }}>
                <Row>
                    <Col>
                        <FormControl sx={{ m: 3, width: 250 }}>
                            <InputLabel id="tiendas-label">Tiendas Disponibles</InputLabel>
                            <Select value={tienda} labelId={"tiendas-label"} onChange={handleChangeTienda} defaultValue={''}>
                                {tiendas.map(tienda =>
                                    <MenuItem key={tienda.idTienda} value={tienda.idTienda}>
                                        {tienda.nombre}
                                    </MenuItem>)}
                            </Select>
                        </FormControl>
                    </Col>
                    <Col xs={8} className='shadow-lg'>
                        <div style={{ width: '90%',maxHeight:"80vh" ,height:"80vh", margin: "30px",overflow:"auto"}}>
                            <DataGrid
                                rows={productos?
                                    productos.map(producto => {
                                        const row = { ...producto, id: producto.id.idProducto };
                                        return row
                                    }):[]
                                }
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                components={{
                                    Toolbar: CustomToolbar,
                                }}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    ) : <>Cargando...</>
}

export default ListaProductoxTienda