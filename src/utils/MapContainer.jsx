import React,{useCallback,useState} from 'react'
import { GoogleMap, Marker, useJsApiLoader,InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '750px'
};

const center = {
  lat: -11.9910945,
  lng: -77.0161053
};

function MapContainer() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const getLatLng=(coord)=>{
      const { latLng} = coord
      const lat = latLng.lat();
      const lng = latLng.lng();
      console.log(lat)
      console.log(lng)
  }

  const divStyle = {
    background: `blue`,
    
    border: `1px solid #ccc`,
    padding: 15
  }

  const [openIW,setOpenIW] =useState(false)

  const handleOpenIW = () => {
    setOpenIW(true)
  }

  const handleCloseIW = () => {
    setOpenIW(false)
  }
  
  
  const onLoadIW = infoWindow => {
    window.open(map.rmiUrl,'_blank')
  }

  

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={9}
        onLoad={onLoad}
        onUnmount={onUnmount}
        clickableIcons={false}
      >
        <>
          <Marker position={center} draggable={true} onDragEnd={(coord)=>getLatLng(coord)} onClick={handleOpenIW}>
          
            {openIW && 
              <InfoWindow
                  onLoad={onLoadIW}
                  onCloseClick={handleCloseIW}
                  position={center}>
                  <div style={divStyle}>
                  <h1>Te encuentas aca</h1>
                </div>
              </InfoWindow>
            }
            

          </Marker>
        </>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapContainer)