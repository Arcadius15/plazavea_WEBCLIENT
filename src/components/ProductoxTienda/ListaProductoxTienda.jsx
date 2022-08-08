import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MenuItem, Select } from '@mui/material';
import TiendaService from '../../services/service/Tienda.service';
import ProductoxTiendaService from '../../services/service/ProductoTienda.service';

const ListaProductoxTienda = () => {
    const [tiendas, setTiendas] = useState([])
    const [tienda, setTienda] = useState()
    const [productos, setProductos] = useState([])

    useEffect(() => {
        const obtenerTiendas = () => {
            TiendaService.getTiendas().then(res => {
                setTiendas(res.data)
            })
        }
        obtenerTiendas()
    }, [])

    useEffect(()=>{
        ProductoxTiendaService.getProductosxTienda(tienda.idTienda)
            .then(res=>{
                setProductos(res.data.content)
            })
    },[tienda])

    const handleChangeTienda = (event) => {
        setTienda(event.target.value)
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Select value={tienda} onChange={handleChangeTienda} label={"Tienda"}>
                            {tiendas.map(tienda =>
                                <MenuItem id={tienda.idTienda} value={tienda.idTienda}>
                                    {tienda.nombre}
                                </MenuItem>)}
                        </Select>
                    </Col>
                    <Col xs={8}>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ListaProductoxTienda