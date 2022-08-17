import React, { useState, useEffect } from "react";
import ProductoService from "../services/service/Producto.service"
import ModalGeneric from "../utils/ModalGeneric"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const Home = () => {
  const [headers, setHeaders] = useState([])
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(0);
  const [totalpaginas, setTotalPaginas] = useState()
  useEffect(() => {
    const get = async () => {
      await ProductoService.getProductos(pagina).then(
        response => {
          setHeaders(Object.keys(response.data.content[0]))
          setProductos(response.data.content);
          setPagina(response.data.number)
          setTotalPaginas(response.data.totalPages - 1)
        },
        (error) => {
          console.log(error);
        }
      );
    }
    get()

  }, [pagina]);


  const inicio = () => {
    setPagina(0)
  }
  const atras = () => {
    let pag = pagina
    if (pagina === 0) {
      return
    }
    setPagina(pag - 1)
  }
  const siguiente = () => {
    let pag = pagina
    if (totalpaginas === pagina) {
      return
    }
    setPagina(pag + 1)
  }
  const final = () => {
    setPagina(totalpaginas)
  }


  return (
    <>
        <h3 align={"center"}>Listado de Productos</h3>
        <TableContainer component={Paper} style={{maxWidth:"100vw",maxHeight:"85vh"}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {headers.map((header, key) =>
                  (<TableCell align={"center"} key={key}>{header.toUpperCase()}</TableCell>))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto, key) => (
                <TableRow key={key}>
                  <TableCell>{producto.idProducto}</TableCell>
                  <TableCell align="center" >{producto.nombre}</TableCell>
                  <TableCell align="center"><img width={"150px"} height={"150px"} src={producto.imagenUrl} alt="..."></img></TableCell>
                  <TableCell align="center">{producto.precioRegular}</TableCell>
                  <TableCell align="center">{producto.precioOferta}</TableCell>
                  <TableCell align="center"><input type={"checkbox"} checked={producto.oferta} readOnly={true}></input></TableCell>
                  <TableCell align="center">
                    <ModalGeneric titulo={"Promociones"} lista={producto.promociones} />
                  </TableCell>
                  <TableCell align="center">
                    <ModalGeneric titulo={"Especificaciones"} lista={producto.especificaciones} />
                  </TableCell>
                  <TableCell align="center">
                    <ModalGeneric titulo={"Descripcion"} lista={producto.descripciones} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


        <div className="containter-fluid">
          <div className="row">
            <div className="col sm" align="center">
              <IconButton size="small" onClick={inicio}>
                <KeyboardDoubleArrowLeftIcon />
              </IconButton>
            </div>
            <div className="col sm" align="center">
              <IconButton size="small" onClick={atras}>
                <KeyboardArrowLeftIcon />
              </IconButton>
            </div>
            <div className="col sm" align="center">
              Pagina {pagina+1} de {totalpaginas+1}
            </div>
            <div className="col sm" align="center"> 
              <IconButton size="small" onClick={siguiente}>
                <KeyboardArrowRightIcon />
              </IconButton>
            </div>
            <div className="col sm" align="center">
              <IconButton size="small" onClick={final}>
                <KeyboardDoubleArrowRightIcon />
              </IconButton>
            </div>
          </div>
        </div>
    </>

  );
};

export default Home;
