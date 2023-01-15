import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import "leaflet/dist/leaflet.css";

import iconLocation from '../assets/icon-location.svg';

const iconMarkup = renderToStaticMarkup(<img src={iconLocation} alt='icon location' className=' w-4 h-10' />);
const customMarkerIcon = divIcon({
  html: iconMarkup,
});

const GoogleMaps = ({ geo, loading }) => {
  if (loading) return <></>
  
  const position = { lat: geo?.location.lat || 51.505, lng: geo?.location.lng || - 0.09 };

  return (
    <div className='absolute bottom-0 w-full h-[calc(100vh-280px)] md:h-[calc(100vh-250px)] lg:h-[calc(100vh-240px)] z-10'>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customMarkerIcon}>
          <Tooltip direction='bottom' sticky>
            <p className='text-center'>
             <span className=' font-bold text-lg'>{ geo.isp }</span> <br /> ({`${geo.location?.city}, ${geo.location?.region} ${geo.location?.postalCode}`})
            </p>
          </Tooltip>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default GoogleMaps