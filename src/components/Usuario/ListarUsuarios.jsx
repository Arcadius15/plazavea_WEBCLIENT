import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UsuarioService from '../../services/service/Usuario.service'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Button } from '@mui/material';


const ButtonUrl = ({params}) =>{
  const currentRow=params.row.idUsuario;
  console.log(currentRow)
  let navigate = useNavigate()
  return <Button variant="contained" color="success" onClick={e=>{e.stopPropagation();navigate("/home");}}>Editar</Button>
}

const columns = [
  { field: 'idUsuario', headerName: 'ID', width: 70 },
  { field: 'email', headerName: 'Correo', width: 250 },
  { field: 'activo', headerName: 'Activado', width: 100 },
  { field: 'pswExp', headerName: 'Fecha de Expiracion(Password)', width: 280 },
  { field: 'blocked', headerName: 'Bloqueo', width: 130 },
  {
    field: 'tipo', headerName: 'Tipo de Usuario', width: 130,
    valueGetter: (params) => {
      if (params.row.cliente) {
        return 'Cliente'
      }
      else if (params.row.empleado) {
        return 'Empleado'
      } else if (params.row.repartidor) {
        return 'Repartidor'
      } else {
        return 'Master'
      }
    },
  },
  {
    field: 'editar', headerName: 'Editar', width: 130,
    sortable:false,
    renderCell: (params) => {
      return <ButtonUrl params={params}/>
    }
  },
];

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}


const ListarUsuarios = () => {
  const [users, setUsers] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const getUsers = async () => {
      await UsuarioService.getAllUsers()
        .then(res => {
          setUsers(res.data)
        },
          () => {
            alert("Error al encontrar Datos")
            navigate("/home")
          })
    }
    getUsers()
  }, [navigate])

  return (
    <>
      <div className='container'>
        <div style={{ height: 400, width: '100%', margin: "30px" }}>
          <DataGrid
            rows={users.map(usuario => { const row = { ...usuario, id: usuario.idUsuario }; return row })}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            components={{
              Toolbar: CustomToolbar,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ListarUsuarios