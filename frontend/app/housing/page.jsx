"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { HousingFilters } from "@/components/housing-filters"
import { HousingList } from "@/components/housing-list"
import { HousingMap } from "@/components/housing-map"
import { HousingDetail } from "@/components/housing-detail"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

export default function HousingPage() {
  const [housing, setHousing] = useState([])
  const [filteredHousing, setFilteredHousing] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedHousing, setSelectedHousing] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    locationType: "all",
    campus: "all",
    availability: true,
  })

  const itemsPerPage = 8

  useEffect(() => {
    const fetchHousing = async () => {
      setLoading(true)
      try {
        const onCampusResponse = await fetch("/api/housing/oncampus", {
          credentials: 'include'
        })
        const offCampusResponse = await fetch("/api/housing/offcampus", {
          credentials: 'include'
        })
  
        if (!onCampusResponse.ok || !offCampusResponse.ok) {
          throw new Error("Failed to fetch housing data")
        }
  
        const onCampusData = await onCampusResponse.json()
        const offCampusData = await offCampusResponse.json()
  
        const allHousing = [...onCampusData, ...offCampusData]
        setHousing(allHousing)
        setFilteredHousing(allHousing)
      } catch (error) {
        console.error("Error fetching housing data:", error)
      } finally {
        setLoading(false)
      }
    }
  
    fetchHousing()
  }, [])

  useEffect(() => {
    const applyFilters = async () => {
      setLoading(true)
      try {
        // Build query string based on filters
        const queryParams = new URLSearchParams()

        if (filters.minPrice > 0) queryParams.append("minPrice", filters.minPrice.toString())
        if (filters.maxPrice < 10000) queryParams.append("maxPrice", filters.maxPrice.toString())
        if (filters.locationType !== "all") queryParams.append("locationType", filters.locationType)
        if (filters.campus !== "all") queryParams.append("campus", filters.campus)
        queryParams.append("availability", filters.availability.toString())

        const response = await fetch(`/api/housing/filter?${queryParams.toString()}`)
        const data = await response.json()

        setFilteredHousing(data)
        setCurrentPage(1) // Reset to first page when filters change
      } catch (error) {
        console.error("Error applying filters:", error)
        // Fallback to client-side filtering if API fails
        const filtered = housing.filter((house) => {
          return (
            house.price >= filters.minPrice &&
            house.price <= filters.maxPrice &&
            (filters.locationType === "all" || house.location_type === filters.locationType) &&
            (filters.campus === "all" || house.campus === filters.campus) &&
            house.availability === filters.availability
          )
        })
        setFilteredHousing(filtered)
      } finally {
        setLoading(false)
      }
    }

    if (housing.length > 0) {
      applyFilters()
    }
  }, [filters, housing])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const handleHousingSelect = (house) => {
    setSelectedHousing(house)
  }

  const handleCloseDetail = () => {
    setSelectedHousing(null)
  }

  // Calculate pagination
  const totalPages = Math.ceil(filteredHousing.length / itemsPerPage)
  const paginatedHousing = filteredHousing.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader>Housing</SiteHeader>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <HousingFilters onFilterChange={handleFilterChange} filters={filters} />
              </div>

              <Tabs defaultValue="list" className="px-4 lg:px-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="map">Map View</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-4">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <HousingList
                      housing={paginatedHousing}
                      onSelect={handleHousingSelect}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </TabsContent>
                <TabsContent value="map" className="mt-4">
                  <HousingMap housing={filteredHousing} onSelect={handleHousingSelect} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>

      {selectedHousing && <HousingDetail housing={selectedHousing} onClose={handleCloseDetail} />}
    </SidebarProvider>
  )
}