"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/utils"
import {
  Building,
  Users,
  Home,
  MapPin,
  Clock,
  Check,
  X,
  Wifi,
  Utensils,
  Droplets,
  Thermometer,
  Shirt,
  Loader2,
} from "lucide-react"
import Image from "next/image"

export function HousingDetail({ housing, onClose, user }) {
  const [isApplying, setIsApplying] = useState(false)
  const [hasApplied, setHasApplied] = useState(false)
  
  console.log("Housing data in detail component:", housing)

  const amenitiesList = housing.amenities.split(",").map((item) => item.trim())

  const getAmenityIcon = (amenity) => {
    const lowerAmenity = amenity.toLowerCase()
  
    let icon;
    if (lowerAmenity.includes("wifi")) icon = <Wifi />
    else if (lowerAmenity.includes("laundry")) icon = <Shirt />
    else if (lowerAmenity.includes("kitchen") || lowerAmenity.includes("dishwasher")) icon = <Utensils />
    else if (lowerAmenity.includes("air") || lowerAmenity.includes("heat")) icon = <Thermometer />
    else if (lowerAmenity.includes("water") || lowerAmenity.includes("bath")) icon = <Droplets />
    else icon = <Check />
  
    return (
      <div className="flex items-center justify-center w-4 h-4 shrink-0">
        {icon}
      </div>
    )
  }

  const applyForHousing = async () => {
    if (!user?.ruid) {
      console.error("User not logged in or RUID not available")
      return
    }
  
    console.log("Applying for housing:", housing.housing_id, "User ID:", user.ruid);
    setIsApplying(true)
    
    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      console.log("Making PATCH request to:", `${apiBaseUrl}/api/students/${user.ruid}`);
      
      const response = await fetch(`${apiBaseUrl}/api/students/${user.ruid}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          chosen_housing_id: parseInt(housing.housing_id)
        })
      });
  
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Failed to apply for housing: ${response.status} ${errorText}`);
      }
  
      const data = await response.json();
      console.log("Successfully applied for housing:", data);
      setHasApplied(true);
    } catch (error) {
      console.error("Error applying for housing:", error);
    } finally {
      // Always update state regardless of success or failure
      if (!hasApplied) {
        setIsApplying(false);
      }
    }
  }

  return (
    <Dialog open={!!housing} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">{housing.name}</DialogTitle>
              <DialogDescription className="text-base mt-1">{housing.address}</DialogDescription>
            </div>
            <Badge variant={housing.location_type === "on_campus" ? "default" : "secondary"}>
              {housing.location_type === "on_campus" ? "On Campus" : "Off Campus"}
            </Badge>
          </div>
        </DialogHeader>

        <div className="relative h-64 w-full my-4 rounded-md overflow-hidden">
          <Image src={housing.image || "/placeholder.svg"} alt={housing.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>
                  {housing.location_type === "on_campus"
                    ? `${housing.housing_type || "Housing"} - ${housing.campus} Campus`
                    : "Off-Campus Housing"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {housing.num_residents} {housing.num_residents > 1 ? "residents" : "resident"}
                </span>
              </div>
              {housing.num_rooms && (
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {housing.num_rooms} {housing.num_rooms > 1 ? "rooms" : "room"}
                  </span>
                </div>
              )}
              {housing.sq_ft && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{housing.sq_ft} sq ft</span>
                </div>
              )}
              {housing.time_to_campus && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{housing.time_to_campus} minutes to campus</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                {housing.availability ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Available</span>
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-red-500">Not Available</span>
                  </>
                )}
              </div>
            </div>

            {housing.min_class_year && (
              <div className="mt-4">
                <h4 className="font-medium mb-1">Eligibility</h4>
                <p>
                  {housing.min_class_year === "All" && "Open to all students"}
                  {housing.min_class_year === "Freshman" && "Freshmen only"}
                  {housing.min_class_year === "Sophomore" && "Sophomores and above"}
                  {housing.min_class_year === "Graduate" && "Graduate students only"}
                </p>
              </div>
            )}

            {housing.avg_lottery_number && (
              <div className="mt-4">
                <h4 className="font-medium mb-1">Average Lottery Number</h4>
                <p>{housing.avg_lottery_number}</p>
              </div>
            )}

            {housing.location_type === "on_campus" && (
              <div className="mt-4">
                <h4 className="font-medium mb-1">Your Chance</h4>
                <div
                  className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${
                    housing.chanceClassification === "high"
                      ? "bg-green-100 text-green-800"
                      : housing.chanceClassification === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : housing.chanceClassification === "low"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {housing.chanceClassification === "high"
                    ? "High Chance"
                    : housing.chanceClassification === "medium"
                      ? "Medium Chance"
                      : housing.chanceClassification === "low"
                        ? "Low Chance"
                        : "Unknown Chance"}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {housing.chanceClassification === "high"
                    ? "Your lottery number gives you a good chance of securing this housing."
                    : housing.chanceClassification === "medium"
                      ? "Your lottery number gives you a moderate chance of securing this housing."
                      : housing.chanceClassification === "low"
                        ? "Your lottery number may make it difficult to secure this housing."
                        : "Chance calculation unavailable."}
                </p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Pricing</h3>
            <div className="bg-muted p-4 rounded-md">
              <div className="text-2xl font-bold">{formatCurrency(housing.price)}</div>
              <div className="text-sm text-muted-foreground">
                {housing.location_type === "on_campus" ? "per semester" : "per month"}
              </div>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Amenities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {amenitiesList.map((amenity, index) => (
                <div key={index} className="flex items-center gap-2">
                  {getAmenityIcon(amenity)}
                  <span className="text-sm">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={applyForHousing} 
            disabled={isApplying || hasApplied || !user?.ruid}
          >
            {isApplying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Applying...
              </>
            ) : hasApplied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Applied
              </>
            ) : (
              "Apply for Housing"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}