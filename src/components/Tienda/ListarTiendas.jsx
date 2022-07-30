import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TiendaService from '../../services/service/Tienda.service';
import Navegador from '../../utils/Navegador';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ListarTiendas = () => {
  const[tiendas,setTiendas] = useState([])

  useEffect(() => {
    const get = async () => {
      await TiendaService.getTiendas().then(
        response => {
          setTiendas(response.data)
        },
        error=>{
          Navegador("home")
        }
      )
    }
    get()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell><h2><span>ID</span></h2></TableCell>
            <TableCell align="center">Nombre Tienda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tiendas.map((row) => (
            <RowCollapse key={row.idTienda} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const RowCollapse = (props) => {
  const { row } = props;
  const [open, setOpen] = useState(false);
  let navigate = useNavigate()
  const irURL=(id)=>{
    navigate(`/tienda/${id}`)
  }
  return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset',background:'#7C9880' } }}>
              <TableCell>
              <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
              >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                 {row.idTienda}
              </TableCell>
              <TableCell align="center">{row.nombre}</TableCell>
          </TableRow>
          <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                      Detalles
                  </Typography>
                  <Table size="small" aria-label="purchases">
                      <TableHead>
                      <TableRow>
                          <TableCell>Direccion</TableCell>
                          <TableCell>Numero de Contacto</TableCell>
                          <TableCell align="right">Horario Apertura</TableCell>
                          <TableCell align="right">Horario Cierre</TableCell>
                          <TableCell align="center">Ver en mapa</TableCell>
                      </TableRow>
                      </TableHead>
                      <TableBody>
                          <TableRow>
                          <TableCell component="th" scope="row">
                              {row.direccion}
                          </TableCell>
                          <TableCell>{row.numeroTelefonico}</TableCell>
                          <TableCell align="right">{row.horarioA}</TableCell>
                          <TableCell align="right">{row.horarioC}</TableCell>
                          <TableCell align="center">
                            <Button variant="contained" color="success" 
                              onClick={()=>irURL(row.idTienda)}>
                              Success
                            </Button>
                          </TableCell>
                          </TableRow>
                      </TableBody>
                  </Table>
                  </Box>
              </Collapse>
              </TableCell>
          </TableRow>
      </>
  )
}

export default ListarTiendas