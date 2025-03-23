"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FilterX, Search } from "lucide-react"

export function HousingFilters({ onFilterChange, filters }) {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice])
  const [locationType, setLocationType] = useState(filters.locationType)
  const [housingType, setHousingType] = useState(filters.housingType || "all")
  const [campus, setCampus] = useState(filters.campus)
  const [availability, setAvailability] = useState(filters.availability)

  // List of campuses for the dropdown
  const campuses = ["all", "Busch", "College Avenue", "Livingston", "Cook/Douglass"]

  const handlePriceChange = (value) => {
    setPriceRange(value)
  }

  const handleLocationTypeChange = (value) => {
    setLocationType(value)
  }
  
  const handleHousingTypeChange = (value) => {
    setHousingType(value)
  }

  const handleCampusChange = (value) => {
    setCampus(value)
  }

  const handleAvailabilityChange = (checked) => {
    setAvailability(checked)
  }

  const applyFilters = () => {
    onFilterChange({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      locationType,
      housingType,
      campus,
      availability,
    })
  }

  const resetFilters = () => {
    setPriceRange([0, 10000])
    setLocationType("all")
    setHousingType("all")
    setCampus("all")
    setAvailability(true)

    onFilterChange({
      minPrice: 0,
      maxPrice: 10000,
      locationType: "all",
      housingType: "all",
      campus: "all",
      availability: true,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Filter Housing Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <Label>
              Price Range (${priceRange[0]} - ${priceRange[1]})
            </Label>
            <Slider
              defaultValue={priceRange}
              min={0}
              max={10000}
              step={100}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <Label>Location Type</Label>
            <Select value={locationType} onValueChange={handleLocationTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select location type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="on_campus">On Campus</SelectItem>
                <SelectItem value="off_campus">Off Campus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Housing Type</Label>
            <Select value={housingType} onValueChange={handleHousingTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select housing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Traditional">Traditional</SelectItem>
                <SelectItem value="Suite">Suite</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Campus</Label>
            <Select value={campus} onValueChange={handleCampusChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select campus" />
              </SelectTrigger>
              <SelectContent>
                {campuses.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === "all" ? "All Campuses" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Available Only</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Switch checked={availability} onCheckedChange={handleAvailabilityChange} id="availability" />
              <Label htmlFor="availability">Show only available housing</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={resetFilters}>
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={applyFilters}>
            <Search className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

