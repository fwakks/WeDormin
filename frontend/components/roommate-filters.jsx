"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FilterX, Search, Cake, GraduationCap, Users, BookOpen } from "lucide-react"

export function RoommateFilters({ onFilterChange, filters }) {
  const [ageRange, setAgeRange] = useState([filters.minAge || 17, filters.maxAge || 30])
  const [major, setMajor] = useState(filters.major || "all")
  const [gender, setGender] = useState(filters.gender || "all")
  const [classYear, setClassYear] = useState(filters.classYear || "all")
  const [searchTerm, setSearchTerm] = useState("")

  const searchTimeout = useRef(null)

  // List of majors for the dropdown
  const majors = ["all", "Computer Science", "Business", "Engineering", "Arts", "Medicine", "Law"]

  // List of genders for the dropdown
  const genders = ["all", "Male", "Female", "Non-binary", "Other"]

  // List of class years for the dropdown
  const classYears = ["all", "Freshman", "Sophomore", "Junior", "Senior", "Graduate"]

  const handleAgeChange = (value) => {
    setAgeRange(value)
  }

  const handleMajorChange = (value) => {
    setMajor(value)
  }

  const handleGenderChange = (value) => {
    setGender(value)
  }

  const handleClassYearChange = (value) => {
    setClassYear(value)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)

    // Debounce the search to avoid too many API calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    searchTimeout.current = setTimeout(() => {
      onFilterChange({
        ...filters,
        searchTerm: e.target.value,
      })
    }, 300)
  }

  const applyFilters = () => {
    onFilterChange({
      minAge: ageRange[0],
      maxAge: ageRange[1],
      major,
      gender,
      classYear,
      searchTerm,
    })
  }

  const resetFilters = () => {
    setAgeRange([17, 30])
    setMajor("all")
    setGender("all")
    setClassYear("all")
    setSearchTerm("")

    onFilterChange({
      minAge: 17,
      maxAge: 30,
      major: "all",
      gender: "all",
      classYear: "all",
      searchTerm: "",
    })
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <FilterX className="mr-2 h-5 w-5 text-muted-foreground" />
          Filter Roommate Options
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label className="flex items-center text-sm font-medium mb-2">
            <Search className="mr-2 h-4 w-4 text-primary" />
            Search by Name
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search roommates..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 py-2 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <Cake className="mr-2 h-4 w-4 text-pink-500" />
              Age Range ({ageRange[0]} - {ageRange[1]})
            </Label>
            <Slider
              defaultValue={ageRange}
              min={17}
              max={30}
              step={1}
              value={ageRange}
              onValueChange={handleAgeChange}
              className="mt-2"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <GraduationCap className="mr-2 h-4 w-4 text-blue-500" />
              Major
            </Label>
            <Select value={major} onValueChange={handleMajorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select major" />
              </SelectTrigger>
              <SelectContent>
                {majors.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m === "all" ? "All Majors" : m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <Users className="mr-2 h-4 w-4 text-purple-500" />
              Gender
            </Label>
            <Select value={gender} onValueChange={handleGenderChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genders.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g === "all" ? "All Genders" : g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center text-sm font-medium">
              <BookOpen className="mr-2 h-4 w-4 text-green-500" />
              Class Year
            </Label>
            <Select value={classYear} onValueChange={handleClassYearChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select class year" />
              </SelectTrigger>
              <SelectContent>
                {classYears.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c === "all" ? "All Class Years" : c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={resetFilters}>
            <FilterX className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={applyFilters} className="bg-primary">
            <Search className="mr-2 h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

