import React, { useCallback, useEffect,useState } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {useFormikContext} from 'formik';

const containerStyle = {
    display:'flex',
    width: '100%',
    height: '400px'
};

const center = {
    lat: -11.9910945,
    lng: -77.0161053
};

const MapForm = () => {

    const {values} = useFormikContext()
    const [lat, setLat] = useState(0)
    const [lng,setLng] = useState(0)

    const getLatLng = (coord) => {
        const { latLng } = coord
        setLat(latLng.lat());
        setLng(latLng.lng());
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY
    })

    const [map, setMap] = useState(null)

    useEffect(()=>{
        console.log(map)
    },[map])

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    useEffect(()=>{
        const setValues=()=>{
            values.lat=lat
            values.lng=lng
        }
        setValues()
    },[lat,lng,values])

    return isLoaded?(
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={9}
                onLoad={onLoad}
                onUnmount={onUnmount}
                clickableIcons={false}>
                <>
                    <Marker position={center} draggable={true}
                        onDragEnd={(coord) => getLatLng(coord)} />
                </>

            </GoogleMap>
    ):<>Cargando...</>
}

export default MapForm