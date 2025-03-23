"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function HousingMap({ housing, onSelect }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState([])

  // Load Google Maps script
  useEffect(() => {
    if (typeof window !== "undefined" && !window.google) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        setMapLoaded(true)
      }
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    } else if (window.google) {
      setMapLoaded(true)
    }
  }, [])

  // Initialize map
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const newMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.5008, lng: -74.4474 }, // Rutgers University coordinates
      zoom: 13,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
    })

    setMap(newMap)
    setLoading(false)
  }, [mapLoaded])

  // Add markers for housing locations
  useEffect(() => {
    if (!map || housing.length === 0) return

    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))

    // Create info window for markers
    const infoWindow = new window.google.maps.InfoWindow()

    // Create new markers
    const newMarkers = housing.map((house) => {
      // Geocode the address to get coordinates
      const geocoder = new window.google.maps.Geocoder()

      return new Promise<google.maps.Marker | null>((resolve) => {
        geocoder.geocode({ address: house.address }, (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
            const marker = new window.google.maps.Marker({
              position: results[0].geometry.location,
              map,
              title: house.name,
              icon: {
                url:
                  house.location_type === "on_campus"
                    ? "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
                    : "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              },
            })

            // Add click event to marker
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

              // Add a button to the info window that will select the housing
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

              // Wait for the info window to be populated
              setTimeout(() => {
                const infoWindowContent = document.querySelector(".gm-style-iw-d")
                if (infoWindowContent) {
                  infoWindowContent.appendChild(selectButton)
                }
              }, 10)
            })

            resolve(marker)
          } else {
            console.error("Geocode failed for address:", house.address, status)
            resolve(null)
          }
        })
      })
    })

    // Wait for all markers to be created
    Promise.all(newMarkers).then((resolvedMarkers) => {
      setMarkers(resolvedMarkers.filter(Boolean))

      // Fit map to markers
      if (resolvedMarkers.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()
        resolvedMarkers.forEach((marker) => {
          if (marker) {
            bounds.extend(marker.getPosition())
          }
        })
        map.fitBounds(bounds)
      }
    })

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