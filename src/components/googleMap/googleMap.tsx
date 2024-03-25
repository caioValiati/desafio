import { setPosition } from '@/lib/redux/geolocation/geolocationSlice';
import { ReloadIcon } from '@radix-ui/react-icons';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

export const GOOGLE_API_KEY = "AIzaSyDbYoZF3wdpDJYOHm-ewvt1wRzmh2icLrE"

function GoogleMapComponent() {
  const dispatch = useDispatch<any>();
  const { position, mapCenter } = useSelector((rootReducer: any) => rootReducer.geolocationReducer);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(mapCenter);
    map.fitBounds(bounds);
    setMap(map)
  }, [mapCenter])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const handleMapCLick = (e: any) => {
    dispatch(setPosition({
      latitude: e.latLng.lat(),
      longitude: e.latLng.lng(),
    }))
  }

  return isLoaded ? (
      <GoogleMap
        onClick={handleMapCLick}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
        center={mapCenter}
        clickableIcons={false}
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={{ 
            lat: position.latitude, 
            lng: position.longitude
          }}
        />
      </GoogleMap>
  ) : 
  <div className="flex w-full h-screen items-center justify-center">
    <ReloadIcon className="w-12 h-12 animate-spin" />
  </div>
}

export default React.memo(GoogleMapComponent)