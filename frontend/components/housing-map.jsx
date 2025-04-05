"use client"

import { useLoadScript, GoogleMap, MarkerF, InfoWindowF } from "@react-google-maps/api"
import { useState } from "react"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

// Styling to make the map container full width and height
const mapContainerStyle = {
  width: "100%",
  height: "500px",
}

// Rutgers University coordinates
const center = {
  lat: 40.5008,
  lng: -74.4474,
}

export function HousingMap({ onSelect }) {
  const [showInfoWindow, setShowInfoWindow] = useState(false)

  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps...</div>

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
      }}
    >
      <MarkerF
        position={center}
        onClick={() => {
          setShowInfoWindow(true)
          if (onSelect) {
            onSelect({
              id: "rutgers",
              name: "Rutgers University",
              location: "New Brunswick, NJ",
            })
          }
        }}
      >
        {showInfoWindow && (
          <InfoWindowF
            position={center}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div>
              <h3>Rutgers University</h3>
              <p>New Brunswick Campus</p>
            </div>
          </InfoWindowF>
        )}
      </MarkerF>
    </GoogleMap>
  )
}