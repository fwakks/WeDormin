"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FilterX, Search } from "lucide-react";

export function RoommateFilters({ onFilterChange, filters }) {
  const [ageRange, setAgeRange] = useState([filters.minAge, filters.maxAge]);
  const [major, setMajor] = useState(filters.major);
  const [gender, setGender] = useState(filters.gender);

  // List of campuses for the dropdown
  const campuses = [
    "all",
    "Computer Science",
    "College Avenue",
    "Livingston",
    "Cook/Douglass",
  ];

  const handleAgeChange = (value) => {
    setAgeRange(value);
  };

  const handleMajorChange = (value) => {
    setMajor(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const applyFilters = () => {
    onFilterChange({
      minAge: ageRange[0],
      maxAge: ageRange[1],
      major,
      gender,
    });
  };

  const resetFilters = () => {
    setAgeRange([0, 10000]);
    setMajor("all");
    setGender("all");

    onFilterChange({
      minAge: 0,
      maxAge: 10000,
      major: "all",
      gender: "all",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Filter Roommate Options</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label>
              Age Range (${ageRange[0]} - ${ageRange[1]})
            </Label>
            <Slider
              defaultValue={ageRange}
              min={0}
              max={10000}
              step={100}
              value={ageRange}
              onValueChange={handleAgeChange}
              className="mt-2"
            />
          </div>

          <div className="space-y-2">
            <Label>Major</Label>
            <Select value={major} onValueChange={handleMajorChange}>
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
            <Label>Gender</Label>
            <Select value={gender} onValueChange={handleGenderChange}>
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
  );
}
