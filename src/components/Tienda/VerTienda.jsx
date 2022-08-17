import React, { useCallback, useState, useEffect} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Link } from '@mui/material';
import { GoogleMap,useJsApiLoader, Marker  } from '@react-google-maps/api';
import TiendaService from '../../services/service/Tienda.service';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const containerStyle = {
  width: '100%',
  height: '300%'
};


const VerTienda = () => {

  const {id} = useParams()
  const[data,setData]=useState()
  const [coords,setCoords] = useState()
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })
  const [isMounted, setIsMounted] = useState(false);
  const [map, setMap] = useState(null)
  
  let navigate = useNavigate()

  useEffect(() => {
    const get = async () => {
      await TiendaService.getTienda(id).then(
        response=>{
          setData(response.data)
          setCoords({lat:response.data.lat,lng:response.data.lng})
          setIsMounted(true)
        },
        (err) => {
          console.log(err)
          //navigate("/home")
        }
      )
    }
    get()
  }, [id,navigate])
  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(coords);
    map.fitBounds(bounds);
    
    setMap(map)
  }, [coords])

  

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const regresar=()=>{
    navigate("/tiendas")
  }

  return isLoaded&& isMounted ?(
    <div className='container pt-3'>
        <div className='row'>
          <div className='col-sm-1'>
            <IconButton size="small"
                    onClick={regresar} >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <div className='col-sm-3'>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://plazavea.vteximg.com.br/arquivos/opg-fb-plazavea-supermercado.jpg"
                  alt="..."
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {data.nombre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <li>Direccion: {data.direccion}</li>
                    <li>Horario Apertura: {data.horarioA}</li>
                    <li>Horario Cierre: {data.horarioC}</li>
                    <li>Contacto: {data.numeroTelefonico}</li>
                    <Link className='text-center'
                        variant="body3"
                        onClick={() => {
                          window.open(map.rmiUrl,'_blank');
                        }}> Ir a Mapa Extendido</Link>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
          <div className='col-sm-8'>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={coords}
              zoom={18}
              onLoad={onLoad}
              onUnmount={onUnmount}
              clickableIcons={false}
            >
              {isMounted &&
              <Marker position={coords} 
                >
                  </Marker>}
            </GoogleMap>
          </div>
        </div>
    </div>
  ): <></>
}

export default VerTienda