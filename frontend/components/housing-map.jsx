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
    script.defer = true;
    script.id = "google-maps-script"
    script.onload = () => {
      setMapLoaded(true);
      console.log("Google Maps script loaded");
    }
    script.onerror = () => {
      console.error("Failed to load Google Maps script");
      setLoading(false);
    }
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
      console.log("Map initialized:", newMap);
      setMap(newMap)
      setLoading(false)

      // Add a test marker
      new window.google.maps.Marker({
        map: newMap,
        position: { lat: 40.5008, lng: -74.4474 },
        title: "Test Marker",
        icon: { url: "https://maps.googleapis.com/mapfiles/ms/icons/red-dot.png" },
      });
    } catch (error) {
      console.error("Error initializing map:", error)
      setLoading(false);
    }
  }, [mapLoaded, map])

  // Add markers when map and housing data are available
  useEffect(() => {
  if (!map || !housing || housing.length === 0) return;

  markers.forEach((marker) => marker.setMap(null));
  setMarkers([]);
  const infoWindow = new window.google.maps.InfoWindow();

  const geocodeLocation = async (house) => {
    const geocoder = new window.google.maps.Geocoder();
    let locationString = house.address || `${house.name}, Rutgers University, Piscataway, NJ 08854`;
    if (!locationString) {
      console.warn(`Skipping creation - both address and name are missing`);
      return null;
    }
    try {
      console.log("Attempting to geocode:", locationString);
      const response = await geocoder.geocode({ address: locationString });
      console.log("Geocode response for", locationString, ":", response.results && response.results.length > 0 ? response.results[0].geometry.location : "No results");
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

  const createMarker = async (house, mapInstance) => {
    const location = await geocodeLocation(house);
    console.log("Geocoded location for", house.name, ":", location ? { lat: location.lat(), lng: location.lng() } : null);
    if (!location) {
      console.warn("Skipping marker creation because location is null for house:", house);
      return null;
    }
    const marker = new window.google.maps.Marker({
      map: mapInstance,
      position: location,
      title: house.name,
      icon: {
        url: house.location_type === "on_campus"
          ? "https://maps.googleapis.com/mapfiles/ms/icons/red-dot.png"
          : "https://maps.googleapis.com/mapfiles/ms/icons/blue-dot.png",
      },
    });
    console.log("Marker created:", marker, "for house:", house);
    marker.addListener("click", () => {
      const content = `
        <div style="max-width: 200px; padding: 5px;">
          <h3 style="margin: 0 0 5px; font-weight: bold;">${house.name}</h3>
          <p style="margin: 0 0 5px;">${house.location_type === "on_campus" ? "On Campus" : "Off Campus"}</p>
          <p style="margin: 0 0 5px;">$${house.price.toLocaleString()}</p>
        </div>
      `;
      infoWindow.setContent(content);
      infoWindow.open(mapInstance, marker);
      const selectButton = document.createElement("button");
      selectButton.textContent = "View Details";
      selectButton.style.marginTop = "5px";
      selectButton.style.padding = "5px 10px";
      selectButton.style.backgroundColor = "#f9f9f9";
      selectButton.style.border = "1px solid #ccc";
      selectButton.style.borderRadius = "4px";
      selectButton.style.cursor = "pointer";
      selectButton.addEventListener("click", () => {
        onSelect(house);
        infoWindow.close();
      });
      setTimeout(() => {
        const infoWindowContent = document.querySelector(".gm-style-iw-d");
        if (infoWindowContent) {
          const buttonContainer = document.createElement("div");
          buttonContainer.appendChild(selectButton);
          infoWindowContent.appendChild(buttonContainer);
        }
      }, 10);
    });
    return marker;
  };

  const generateMarkers = async () => {
    if (!map) {
      console.warn("Map is not initialized yet. Cannot generate markers.");
      return;
    }
    const newMarkers = await Promise.all(housing.map(house => createMarker(house, map)));
    const validMarkers = newMarkers.filter(Boolean);
    console.log("Number of valid markers:", validMarkers.length);
    setMarkers(validMarkers);
    if (validMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      validMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition());
      });
      map.fitBounds(bounds);
      console.log("Map bounds set to:", bounds);
    } else {
      console.warn("No valid markers to display.");
    }
  };

  generateMarkers();

  return () => {
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    infoWindow.close();
  };
}, [housing, map, onSelect]);

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
  );
}