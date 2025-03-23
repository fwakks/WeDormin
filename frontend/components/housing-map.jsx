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
  const [debugInfo, setDebugInfo] = useState("Initializing...")

  // Load Google Maps script properly
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setDebugInfo("Checking Google Maps script...")
    
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setMapLoaded(true)
      setDebugInfo("Google Maps already loaded")
      return
    }
    
    // Add script with proper async attribute
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`
    script.id = "google-maps-script"
    script.onload = () => {
      setMapLoaded(true)
      setDebugInfo("Google Maps script loaded")
    }
    script.onerror = (error) => {
      console.error("Error loading Google Maps script:", error)
      setDebugInfo("Error loading Google Maps")
    }
    
    // Remove any existing scripts first
    const existingScript = document.getElementById("google-maps-script")
    if (existingScript) {
      existingScript.remove()
    }
    
    document.head.appendChild(script)
    
    return () => {
      // Cleanup if component unmounts
      if (document.getElementById("google-maps-script")) {
        document.getElementById("google-maps-script").remove()
      }
    }
  }, [])

  // Initialize map when Google Maps is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current || map) return
    
    setDebugInfo("Initializing map...")
    
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
      setDebugInfo("Map initialized")
    } catch (error) {
      console.error("Error initializing map:", error)
      setDebugInfo(`Map initialization error: ${error.message}`)
    }
  }, [mapLoaded, map])

  // Add markers only after map is initialized and housing data exists
  useEffect(() => {
    if (!map || !housing) {
      setDebugInfo("Waiting for map and housing data...")
      return
    }
    
    if (housing.length === 0) {
      setDebugInfo("No housing data to display")
      return
    }
    
    setDebugInfo(`Processing ${housing.length} housing entries...`)
    
    // Clear existing markers
    markers.forEach((marker) => marker.setMap(null))
    
    // Debug the first few housing entries
    console.log("Housing data sample:", housing.slice(0, 3))

    // Create info window for markers
    const infoWindow = new window.google.maps.InfoWindow()

    // Filter out entries without valid addresses
    const validHousing = housing.filter(house => house && house.address && typeof house.address === 'string')
    setDebugInfo(`Found ${validHousing.length} entries with valid addresses`)
    
    // Use hardcoded coordinates for properties without addresses
    const defaultCenter = { lat: 40.5008, lng: -74.4474 }

    // Create new markers
    const newMarkers = validHousing.map((house) => {
      return new Promise((resolve) => {
        // Geocode the address to get coordinates
        const geocoder = new window.google.maps.Geocoder()
        
        geocoder.geocode({ address: house.address }, (results, status) => {
          try {
            if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
              const position = results[0].geometry.location
              
              // Create marker
              const marker = new window.google.maps.Marker({
                position: position,
                map: map,
                title: house.name || "Unnamed Location",
                icon: {
                  url: house.location_type === "on_campus" 
                    ? "https://maps.googleapis.com/mapfiles/ms/icons/red-dot.png" 
                    : "https://maps.googleapis.com/mapfiles/ms/icons/blue-dot.png"
                }
              })
              
              // Add click event
              marker.addListener("click", () => {
                const content = `
                  <div style="max-width: 200px; padding: 5px;">
                    <h3 style="margin: 0 0 5px; font-weight: bold;">${house.name || "Unnamed Location"}</h3>
                    <p style="margin: 0 0 5px;">${house.location_type === "on_campus" ? "On Campus" : "Off Campus"}</p>
                    <p style="margin: 0 0 5px;">${house.address || "No address"}</p>
                    <p style="margin: 0 0 5px;">$${house.price ? house.price.toLocaleString() : "N/A"}</p>
                  </div>
                `
                
                infoWindow.setContent(content)
                infoWindow.open(map, marker)
                
                // Add button
                setTimeout(() => {
                  const infoWindowContent = document.querySelector(".gm-style-iw-d")
                  if (infoWindowContent) {
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
                    
                    infoWindowContent.appendChild(selectButton)
                  }
                }, 10)
              })
              
              resolve(marker)
            } else {
              console.warn(`Geocode failed for address: "${house.address}" with status: ${status}`)
              resolve(null)
            }
          } catch (error) {
            console.error("Error creating marker:", error)
            resolve(null)
          }
        })
      })
    })

    // Wait for all markers to be created
    Promise.all(newMarkers)
      .then((resolvedMarkers) => {
        const validMarkers = resolvedMarkers.filter(Boolean)
        setMarkers(validMarkers)
        setDebugInfo(`Created ${validMarkers.length} markers successfully`)
        
        // Fit map to markers if we have any
        if (validMarkers.length > 0) {
          try {
            const bounds = new window.google.maps.LatLngBounds()
            validMarkers.forEach((marker) => {
              if (marker && marker.getPosition()) {
                bounds.extend(marker.getPosition())
              }
            })
            
            // Ensure bounds are valid before fitting
            if (!bounds.isEmpty()) {
              map.fitBounds(bounds)
              setDebugInfo("Map adjusted to fit all markers")
            } else {
              setDebugInfo("Could not adjust map bounds (empty)")
            }
          } catch (error) {
            console.error("Error fitting bounds:", error)
            setDebugInfo(`Error fitting bounds: ${error.message}`)
          }
        } else {
          setDebugInfo("No valid markers to display")
        }
      })
      .catch((error) => {
        console.error("Error processing markers:", error)
        setDebugInfo(`Error processing markers: ${error.message}`)
      })

    return () => {
      infoWindow.close()
    }
  }, [housing, map, onSelect])

  return (
    <Card className="overflow-hidden">
      {loading && (
        <div className="flex flex-col justify-center items-center h-[500px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-4" />
          <div className="text-sm text-muted-foreground">{debugInfo}</div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-[500px]" style={{ display: loading ? "none" : "block" }} />
      {!loading && (
        <div className="p-4 flex flex-col gap-2 bg-muted/50">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">On Campus</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Off Campus</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">{debugInfo}</div>
        </div>
      )}
    </Card>
  )
}