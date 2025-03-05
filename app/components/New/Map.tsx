import { useEffect, useRef } from 'react'

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (typeof window !== 'undefined' && mapContainerRef.current) {
      // Initialize map with brown theme
      const map = document.createElement('div')
      map.style.width = '100%'
      map.style.height = '100%'
      map.innerHTML = `
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://www.openstreetmap.org/export/embed.html?bbox=72.79632568359376%2C18.94157767436867%2C73.00445556640625%2C19.200060747686402&layer=hot&marker=19.0760%2C72.8777&
          ${Array.from({length: 5}, (_, i) => 
            `marker=${[
              // Mumbai landmarks with labels
              '19.0760,72.8777,Mumbai+City+Center',
              '18.9750,72.8258,Colaba',
              '19.0330,72.8476,Bandra+KC',
              '19.2147,72.9863,Sanjay+Gandhi+Park',
              '19.1587,72.8417,International+Airport'
            ][i]}`
          ).join('&')}"
          style="filter: sepia(0.3) saturate(1.4) hue-rotate(340deg);"
        ></iframe>
      `
      
      // Add custom controls
      const controls = document.createElement('div')
      controls.innerHTML = `
        <div style="position: absolute; bottom: 20px; right: 20px; z-index: 1000;">
          <a 
            href="https://www.openstreetmap.org/#map=13/19.0760/72.8777" 
            target="_blank"
            style="
              background: #6b4f3a;
              color: #f5e6d3;
              padding: 8px 16px;
              border-radius: 8px;
              text-decoration: none;
              font-family: sans-serif;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            "
          >
            Open Full Map
          </a>
        </div>
      `

      mapContainerRef.current.appendChild(map)
      mapContainerRef.current.appendChild(controls)
    }
  }, [])

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
  )
}

export default Map