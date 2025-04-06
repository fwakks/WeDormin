"use client"

import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api"
import { useState, useEffect } from "react"

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""

// Styling to make the map container full width and height
const mapContainerStyle = {
  width: "100%",
  height: "500px",
}

// Default center coordinates (Rutgers University)
const defaultCenter = {
  lat: 40.5075, 
  lng: -74.4470,
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
          console.error("Geocode failed: " + status)
          reject(status)
        }
      })
    })
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
          try {
            const coords = await geocodeAddress(house.address || house.name)
            return { ...house, lat: coords.lat, lng: coords.lng }
          } catch (error) {
            // If geocoding fails for a particular address, skip it
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

  // Set the map center to the first geocoded housing item if available
  const mapCenter =
    geocodedHousing.length > 0
      ? { lat: geocodedHousing[0].lat, lng: geocodedHousing[0].lng }
      : defaultCenter

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={mapCenter}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        streetViewControl: true,
        mapTypeControl: true,
      }}
    >
      {geocodedHousing.map((house, index) => (
        <MarkerF
          key={house.housing_id || index}
          position={{ lat: house.lat, lng: house.lng }}
          onClick={() => onSelect && onSelect(house)}
        />
      ))}
    </GoogleMap>
  )
}