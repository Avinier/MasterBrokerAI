import { useEffect, useRef } from 'react';

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current) {
      // Define markers for Mumbai landmarks
      const markers = [
        { lat: 19.0760, lng: 72.8777, label: 'Mumbai+City+Center' }, // Mumbai City Center
        { lat: 18.9750, lng: 72.8258, label: 'Colaba' }, // Colaba
        { lat: 19.0330, lng: 72.8476, label: 'Bandra+KC' }, // Bandra Kurla Complex
        { lat: 19.2147, lng: 72.9863, label: 'Sanjay+Gandhi+Park' }, // Sanjay Gandhi National Park
        { lat: 19.1587, lng: 72.8417, label: 'International+Airport' }, // Chhatrapati Shivaji International Airport
      ];

      // Construct the iframe URL with multiple markers
      const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=72.79632568359376%2C18.94157767436867%2C73.00445556640625%2C19.200060747686402&layer=hot&${markers
        .map((marker) => `marker=${marker.lat},${marker.lng},${marker.label}`)
        .join('&')}`;

      // Initialize map with brown theme
      const map = document.createElement('div');
      map.style.width = '100%';
      map.style.height = '100%';
      map.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="${iframeUrl}"
          style="filter: sepia(0.3) saturate(1.4) hue-rotate(340deg);"
        ></iframe>
      `;

      // Append the map to the container
      mapContainerRef.current.appendChild(map);
    }
  }, []);

  return (
    <div className="w-1/2 h-[500px] space-x-4 mt-4 relative">
      {/* Glowing overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-700/20 via-amber-600/30 to-amber-900/40 animate-pulse blur-xl rounded-xl z-0" />

      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full bg-white/10 rounded-xl overflow-hidden relative z-10"
        style={{ minHeight: '500px' }}
      />
    </div>
  );
};

export default Map;