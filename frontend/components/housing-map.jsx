"use client"

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { useState, useEffect } from "react"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

// Styling to make the map container full width and height
const mapContainerStyle = {
  width: "100%",
  height: "500px",
  position: "relative" // Add relative positioning for legend
}

// Default center coordinates (Rutgers University)
const defaultCenter = {
  lat: 40.5008,
  lng: -74.4474
}

export function HousingMap({ housing = [], onSelect }) {
  // Load the Google Maps script
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  })

  // State to hold housing items with geocoded coordinates
  const [geocodedHousing, setGeocodedHousing] = useState([])

  // Helper function to geocode an address and return a promise with lat/lng
  const geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location
          resolve({
            lat: location.lat(),
            lng: location.lng(),
          })
        } else {
          console.error("Geocode failed: " + status + " for address: " + address)
          reject(status)
        }
      })
    })
  }

  // Get marker icon based on location_type (using default Google Maps icons)
  const getMarkerIcon = (house) => {
    if (house.location_type === "on_campus") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      }
    } else if (house.location_type === "off_campus") {
      return {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
      }
    }
    return null // Default marker if no type specified
  }

  // Geocode each housing address when housing prop or map load status changes
  useEffect(() => {
    if (!isLoaded || housing.length === 0) {
      setGeocodedHousing([])
      return
    }

    const fetchGeocodes = async () => {
      const results = await Promise.all(
        housing.map(async (house) => {
          // Fallback to name appended with "Rutgers University, NJ" if address is null
          const queryAddress = house.address || `${house.name} Rutgers University, NJ`
          try {
            const coords = await geocodeAddress(queryAddress)
            return { ...house, lat: coords.lat, lng: coords.lng }
          } catch (error) {
            console.error("Error geocoding for:", queryAddress, error)
            return null
          }
        })
      )
      setGeocodedHousing(results.filter((item) => item !== null))
    }

    fetchGeocodes()
  }, [housing, isLoaded])

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading maps...</div>

  const mapCenter = defaultCenter

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={mapCenter}
        options={{
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        }}
      >
        {geocodedHousing.map((house, index) => (
          <MarkerF
            key={house.housing_id || index}
            position={{ lat: house.lat, lng: house.lng }}
            onClick={() => onSelect && onSelect(house)}
            icon={getMarkerIcon(house)}
          />
        ))}
      </GoogleMap>
      
      {/* Legend positioned at the bottom of the map */}
      <div className="absolute bottom-4 left-4 bg-white p-2 rounded shadow-md z-10 flex items-center gap-4 text-sm">
        <div className="flex items-center">
          <img 
            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" 
            alt="On Campus" 
            className="h-6 w-6 mr-1" 
          />
          <span>On Campus</span>
        </div>
        <div className="flex items-center">
          <img 
            src="http://maps.google.com/mapfiles/ms/icons/red-dot.png" 
            alt="Off Campus" 
            className="h-6 w-6 mr-1" 
          />
          <span>Off Campus</span>
        </div>
      </div>
    </div>
  )
}