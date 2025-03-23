"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function HousingMap({ housing, onSelect }) {
  const mapRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    console.log("Housing data:", housing);
  }, [housing]);

  // Load Google Maps script
  useEffect(() => {
    if (window.google && window.google.maps) {
      setMapLoaded(true)
      return
    }

    const existingScript = document.getElementById("google-maps-script")
    if (existingScript) {
      if (!window.google || !window.google.maps) {
        existingScript.addEventListener("load", () => setMapLoaded(true))
      } else {
        setMapLoaded(true)
      }
      return
    }

    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    script.id = "google-maps-script"
    script.onload = () => setMapLoaded(true)
    document.head.appendChild(script)
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map) return

    try {
      const newMap = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.5008, lng: -74.4474 }, // Rutgers University coordinates
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      })

      setMap(newMap)
      setLoading(false)
    } catch (error) {
      console.error("Error initializing map:", error)
    }
  }, [mapLoaded, map])

  // Add markers when map and housing data are available
  useEffect(() => {
    if (!map || !housing || housing.length === 0) return

    markers.forEach((marker) => marker.setMap(null)) // Clear existing markers
    const infoWindow = new window.google.maps.InfoWindow()

    const geocodeLocation = async (house) => {
      const geocoder = new window.google.maps.Geocoder();
      let locationString = house.address || (house.name + " Rutgers University, New Brunswick, NJ");
    
      if (!locationString) {
        console.warn(`Skipping marker creation - both address and name are missing`);
        return null;
      }
    
      try {
        console.log("Attempting to geocode:", locationString);
        const response = await geocoder.geocode({ address: locationString });
        console.log("Geocode response:", response);
        
        if (response.results && response.results.length > 0) {
          return response.results[0].geometry.location;
        } else {
          console.error("No results found for:", locationString);
          return null;
        }
      } catch (error) {
        console.error("Geocoding error for:", locationString, error);
        return null;
      }
    };

    const createMarker = async (house) => {
      const location = await geocodeLocation(house)

      if (!location) return null

      const marker = new window.google.maps.Marker({
        position: location,
        map,
        title: house.name,
        icon: {
          url:
            house.location_type === "on_campus"
              ? "https://maps.googleapis.com/mapfiles/ms/icons/red-dot.png"
              : "https://maps.googleapis.com/mapfiles/ms/icons/blue-dot.png",
        },
      })

      marker.addListener("click", () => {
        const content = `
          <div style="max-width: 200px; padding: 5px;">
            <h3 style="margin: 0 0 5px; font-weight: bold;">${house.name}</h3>
            <p style="margin: 0 0 5px;">${house.location_type === "on_campus" ? "On Campus" : "Off Campus"}</p>
            <p style="margin: 0 0 5px;">$${house.price.toLocaleString()}</p>
          </div>
        `

        infoWindow.setContent(content)
        infoWindow.open(map, marker)

        const selectButton = document.createElement("button")
        selectButton.textContent = "View Details"
        selectButton.style.marginTop = "5px"
        selectButton.style.padding = "5px 10px"
        selectButton.style.backgroundColor = "#f9f9f9"
        selectButton.style.border = "1px solid #ccc"
        selectButton.style.borderRadius = "4px"
        selectButton.style.cursor = "pointer"

        selectButton.addEventListener("click", () => {
          onSelect(house)
          infoWindow.close()
        })

        setTimeout(() => {
          const infoWindowContent = document.querySelector(".gm-style-iw-d")
          if (infoWindowContent) {
            const buttonContainer = document.createElement("div")
            buttonContainer.setAttribute("role", "region")
            buttonContainer.appendChild(selectButton)
            infoWindowContent.appendChild(buttonContainer)
          }
        }, 10)
      })

      return marker
    }

    const generateMarkers = async () => {
      const newMarkers = await Promise.all(housing.map(createMarker))
      setMarkers(newMarkers.filter(Boolean))

      const validMarkers = newMarkers.filter(Boolean)
      if (validMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        validMarkers.forEach((marker) => bounds.extend(marker.getPosition()))
        map.fitBounds(bounds)
      }
    }

    generateMarkers()

    return () => {
      infoWindow.close()
    }
  }, [housing, map, onSelect])

  return (
    <Card className="overflow-hidden">
      {loading && (
        <div className="flex justify-center items-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-[500px]" style={{ display: loading ? "none" : "block" }} />
      <div className="p-4 flex gap-4 bg-muted/50">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm">On Campus</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="text-sm">Off Campus</span>
        </div>
      </div>
    </Card>
  )
}