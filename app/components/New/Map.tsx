import { useEffect, useRef, useState } from 'react'
import { LoadScript } from '@react-google-maps/api'

const MAP_CONTAINER_STYLE = {
  width: '100%',
  height: '500px'
}

const MUMBAI_CENTER = {
  lat: 19.0760,
  lng: 72.8777
}

const BROWN_MAP_STYLES = [
  {
    featureType: 'all',
    elementType: 'geometry',
    stylers: [{ color: '#f5e6d3' }] // Light brown base
  },
  {
    featureType: 'road',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#4b382a' }] // Dark brown text outline
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{ color: '#d4c4ab' }] // Beige water
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }]
  }
]

const MumbaiMap = () => {
  const mapRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="w-1/2 h-[500px] space-x-4 mt-4 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-amber-600/30 to-amber-900/40 animate-pulse blur-xl rounded-xl z-0" />
      
      <div className="w-full h-full bg-white/10 rounded-lg p-4 flex justify-center items-center relative z-10">
        <LoadScript
          googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
          onLoad={() => setIsLoaded(true)}
          onError={() => console.error('Failed to load Google Maps')}
        >
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={MAP_CONTAINER_STYLE}
              center={MUMBAI_CENTER}
              zoom={12}
              options={{
                styles: BROWN_MAP_STYLES,
                disableDefaultUI: true,
                zoomControl: true,
                backgroundColor: '#2d2218'
              }}
            >
              {/* Custom Marker with Brown Theme */}
              <Marker
                position={MUMBAI_CENTER}
                icon={{
                  path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z',
                  fillColor: '#6b4f3a',
                  fillOpacity: 1,
                  strokeColor: '#4b382a',
                  strokeWeight: 2,
                  scale: 1.5
                }}
              >
                <InfoWindow>
                  <div className="bg-amber-100 p-2 rounded-lg text-brown-800">
                    <strong>Mumbai Central</strong>
                  </div>
                </InfoWindow>
              </Marker>

              {/* Add more Mumbai landmarks */}
              <Marker
                position={{ lat: 18.9750, lng: 72.8258 }}
                options={{
                  icon: {
                    url: 'data:image/svg+xml;utf-8,<svg ...></svg>', // Custom SVG
                  }
                }}
              />
            </GoogleMap>
          )}
        </LoadScript>
      </div>
    </div>
  )
}

export default MumbaiMap