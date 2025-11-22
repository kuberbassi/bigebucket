import React, { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png?url'
import markerIconUrl from 'leaflet/dist/images/marker-icon.png?url'
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png?url'

// fix default icon issues in some bundlers / Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2xUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl
})

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng)
    }
  })

  return position === null ? null : (
    <Marker position={position}></Marker>
  )
}

const MapPicker = ({ initialPosition = { lat: 28.6139, lng: 77.2090 }, onSave, onClose }) => {
  const [position, setPosition] = useState(initialPosition)

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='bg-white w-[90%] max-w-5xl h-[80vh] rounded shadow-lg overflow-hidden flex'>
        <div className='w-1/2'>
          <MapContainer center={[initialPosition.lat, initialPosition.lng]} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <LocationMarker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>
        <div className='w-1/2 p-4 flex flex-col'>
          <div className='flex justify-between items-center'>
            <h3 className='font-semibold'>Enter complete address</h3>
            <button onClick={onClose} className='text-gray-600'>X</button>
          </div>
          <div className='mt-4 flex-1 overflow-auto'>
            <p className='text-sm text-gray-500'>Click on map to pick delivery location. Drag/zoom to refine.</p>
            <div className='mt-4'>
              <label className='block text-xs text-gray-600'>Selected coordinates</label>
              <div className='p-2 bg-gray-100 rounded mt-1'>Lat: {position?.lat?.toFixed(6)}, Lng: {position?.lng?.toFixed(6)}</div>
            </div>
            <div className='mt-4'>
              <label className='block text-xs text-gray-600'>Nearby landmark (optional)</label>
              <input id='landmark' name='landmark' className='w-full border p-2 rounded mt-1' />
            </div>
          </div>
          <div className='mt-4 flex gap-3'>
            <button className='bg-green-600 text-white px-4 py-2 rounded' onClick={() => onSave({ position, landmark: document.getElementById('landmark')?.value || '' })}>Save Address</button>
            <button className='px-4 py-2 border rounded' onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MapPicker
